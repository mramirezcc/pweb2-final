import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { Book } from '../book.model';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Compra } from '../compra.model';

@Component({
  selector: 'app-usuario-main',
  templateUrl: './usuario-main.component.html',
  styleUrls: ['./usuario-main.component.css']
})
export class UsuarioMainComponent implements OnInit {
  user: User = {
    id: -1,
    portrait: '',
    username: '',
    email: '',
    password: '',
    number: '',
    address: ''
  };
  
  books: Book[] = [];

  showEdit: boolean = false;
  allSales: any[] = [];
  constructor(private router: Router, private api: ApiService, private authService: AuthService) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.user = this.authService.getUser() as User;
    }
  }
  compra: Compra[] = [];

  ngOnInit(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user) as User;
      console.log("Usuario recibido:", this.user.id);
      
      this.api.getBooksByUser(this.user.id).subscribe(
        (books: any[]) => {
          this.books = books;
          this.compra = books.map(book => ({
            name: book.name,
            author: book.author,
            cathegory: book.cathegory,
            date: book.date,
          }));
          console.log("waos", this.compra); 
        },
        error => {
          console.error("Error al obtener los libros:", error);
        }
      );
    } else {
      console.log("No se recibió ningún usuario");
    }
  }
  

  toggleEdit(): void {
    this.showEdit = !this.showEdit;
  }

  atras(): void {
    this.router.navigate(['/']);
  }

  //allSales ={
  //id
  //metodo de pago
  //idUser
  //idBook
  //total
  //date
  //}

  //extraer todas las compras del usuario this.user y luego generar los siguientes arreglos con las solicitudes http
    


}
