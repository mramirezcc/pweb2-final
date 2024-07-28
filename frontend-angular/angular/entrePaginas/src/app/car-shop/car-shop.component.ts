import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { Router } from '@angular/router'; // Importa el Router
import { ApiService } from '../api.service';
import { User } from '../user.model';

interface BookToBuy {
  id: number;
  portrait: string;
  name: string;
  author: string;
  price: number;
  cathegory: string; 
  summary: string;
  year: number;
  amount: number;
}


@Component({
  selector: 'app-car-shop',
  templateUrl: './car-shop.component.html',
  styleUrl: './car-shop.component.css'
})
export class CarShopComponent implements OnInit {
  //obtener el usuario de session storage y los libros del carrito...
  //Ahora creo mi nuevo arreglo.....
  libros: Book[] = [];
  librosParaComprar: BookToBuy[] = [];

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
      amount: 1
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
    libro.amount++;
  }

  disminuirCantidad(libro: BookToBuy) {
    if (libro.amount > 1) {
      libro.amount--;
    }
  }

  eliminarLibro(libro: BookToBuy) {
    this.libros = this.libros.filter(l => l !== libro);
    //llamada api para elimnar un libro y tal!
  }
  buy(){
    //Por cada librosParaComprar, crea el objeto libro y recorre librosParaComprar.amount veces agregando todos los libros hacia sale.
    //sale se agrega con user y book
  } 
  regresar() {
    this.router.navigate(['/user']);
  }
}
