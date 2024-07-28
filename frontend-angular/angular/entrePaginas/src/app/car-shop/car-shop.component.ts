import { COMPILER_OPTIONS, Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { Router } from '@angular/router'; // Importa el Router
import { ApiService } from '../api.service';
import { User } from '../user.model';
import { forkJoin, Observable } from 'rxjs';
import { CONNREFUSED } from 'dns';

interface BookToBuy {
  id: number; //es el id del libro!
  portrait: string;
  name: string;
  author: string;
  price: number;
  cathegory: string; 
  summary: string;
  year: number;
  amount: number;
  stock: number;
}


@Component({
  selector: 'app-car-shop',
  templateUrl: './car-shop.component.html',
  styleUrl: './car-shop.component.css'
})
export class CarShopComponent implements OnInit {
  libros: Book[] = [];
  librosParaComprar: BookToBuy[] = [];
  showCart: boolean = true; // Nueva propiedad
  
  constructor(private router: Router, private api: ApiService) { }
  userData: User | null = null;
  isUserLoggedIn: boolean = false;

  ngOnInit(): void {
    this.checkUserSession();
    if (this.isUserLoggedIn && this.userData) {
      this.getCartBooks(this.userData.id);

    }
  }

  checkUserSession(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.userData = JSON.parse(user) as User;
      this.isUserLoggedIn = true;
      console.log("Este es el carrito de:", this.userData.username);
    } else {
      this.isUserLoggedIn = false;
      console.log("No hay usuario!");
    }
  }

  getCartBooks(userId: number): void {
    this.api.getBooksInCart(userId).subscribe(
      (books: Book[]) => {
        this.libros = books;
        console.log("Libros en el carrito:", this.libros);
        this.initializeBooksToBuy(); 
      },
      error => {
        console.error("Error al obtener los libros del carrito:", error);
      }
    );
  }

  initializeBooksToBuy(): void {
    this.librosParaComprar = this.libros.map(libro => ({
      id: libro.id,
      portrait: "http://127.0.0.1:8000/" + libro.portrait, //no se porque el enlace es relativo....pipipi
      name: libro.name,
      author: libro.author,
      price: libro.price,
      cathegory: libro.cathegory,
      summary: libro.summary,
      year: libro.year,
      amount: 1, //siempre el monto inicial es 1
      stock: libro.stock,
    }));
    console.log("Libros para comprar:", this.librosParaComprar);
  }


  

  get subtotal(): number {
    return this.librosParaComprar.reduce((acc, book) => acc + book.price * book.amount, 0);
  }
  get igv(): number{
    return this.total*0.18;
  }
  get total(): number {
    return this.subtotal; 
  }
  
  incrementarCantidad(libro: BookToBuy) {
    if(libro.amount < libro.stock){
      libro.amount++;
    }else{
      alert("Excediendo el stock");
    }
    
  }

  disminuirCantidad(libro: BookToBuy) {
    if (libro.amount > 1) {
      libro.amount--;
    }
  }

  eliminarLibro(libro: BookToBuy) {
    if (this.isUserLoggedIn && this.userData && libro) {
      console.log("Se elimina el libro ", libro.name, " del carrito de ", this.userData.username);
      this.api.removeBookFromCart(this.userData.id, libro.id).subscribe(
        response => {
          console.log("Libro eliminado del carrito:", response);
          this.librosParaComprar = this.librosParaComprar.filter(b => b.id !== libro.id);
        },
        error => {
          console.error("Error al eliminar el libro del carrito", error);
        }
      );
    } else {
      alert("No está registrado!");
    }
  }

  private generatePurchaseCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase(); // Genera un código aleatorio de 6 caracteres
  }
  purchaseCode: string | undefined;
  buy(){
    //Generar un codigo aleatorio de 6 cifras para verificar el pago
    const total = this.subtotal;
    this.purchaseCode = this.generatePurchaseCode();
    const mensaje = `🛒 *Solicitud de compra*: 
    El monto a pagar es de $${total}. 
    Mi código de compra es: ${this.purchaseCode}`;
    if (this.userData) {
      this.api.sendMessage(this.userData, mensaje).subscribe(
        (response: any) => {
          console.log("Mensaje enviado:", response);
          this.showCart = false;

        },
        (error: any) => {
          alert("Error al enviar el mensaje.");
          console.error(error);
        }
      );
    } else {
      alert("No está registrado!");
    }

  } 

  handlePurchaseConfirmed() {
    alert("Empezando el proceso de generacion del recibo, actualizando stock y poniendo todo en el modelo sale")
    this.showCart = true;


    if (this.userData) {
      console.log("Agregando los libros al user ", this.userData);
      console.log("Los libros a agregar son ", this.librosParaComprar);
  
      const addBooksObservables: Observable<any>[] = [];
      const decrementStockObservables: Observable<any>[] = [];
  
      this.librosParaComprar.forEach(libro => {
        for (let i = 0; i < libro.amount; i++) {
          addBooksObservables.push(this.api.addBookToUser(this.userData!.id, libro.id));
        }
        decrementStockObservables.push(this.api.decrementBookStock(libro.id, libro.amount));
        console.log("Añadiendo el libro " + libro.name);
      });
  
      // Usar forkJoin para esperar hasta que todas las peticiones sean completadas
      forkJoin(addBooksObservables).subscribe(
        () => {
          forkJoin(decrementStockObservables).subscribe(
            () => {
              // Después de agregar los libros y restar el stock, generar el PDF
              this.api.generatePdf(this.userData!.id, this.librosParaComprar).subscribe(
                (response: Blob) => {
                  const blob = new Blob([response], { type: 'application/pdf' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'boleta_venta.pdf';
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  a.remove();
                  alert("PDF generado y descargado.");
                },
                error => {
                  alert("Error al generar el PDF.");
                  console.error(error);
                }
              );
            },
            error => {
              alert("Error al decrementar el stock del libro.");
              console.error(error);
            }
          );
        },
        error => {
          alert("Error al agregar los libros al usuario.");
          console.error(error);
        }
      );
    } else {
      alert("No está registrado!");
    }
  }

  regresar() {
    this.router.navigate(['/user']);
  }
}




    /*
    if (this.isUserLoggedIn && this.userData) {
      for (let libro of this.librosParaComprar) {
        if (libro.amount <= libro.stock) {
          const saleData = {
            userId: this.userData.id,
            bookId: libro.id,
            amount: libro.amount
          };
          console.log(libro);
          // Aquí puedes llamar a tu API para confirmar la compra
        } else {
          alert(`La cantidad solicitada para el libro ${libro.name} excede el stock disponible.`);
        }
      }
    } else {
      alert("No está registrado!");
    }
      */