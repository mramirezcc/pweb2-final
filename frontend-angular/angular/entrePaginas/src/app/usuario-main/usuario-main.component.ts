import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-usuario-main',
  templateUrl: './usuario-main.component.html',
  styleUrls: ['./usuario-main.component.css']
})
export class UsuarioMainComponent implements OnInit {
  user: User = {
    portrait: '',
    username: '',
    email: '',
    password: '',
    number: '',
    address: ''
  };

  showEdit: boolean = false;
  allSales: any[] = [];
  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    const user = sessionStorage.getItem('user');  // Obtener de sessionStorage
    if (user) {
      this.user = JSON.parse(user) as User;
      console.log("Usuario recibido:", this.user);
      alert("Usuario recibido exitosamente!");


      this.api.getUserId(this.user.email).subscribe(idUser => {
        if (idUser !== null) {
          console.log("El id de este usuario es " + idUser);

          // Llama al método para obtener los libros comprados por el usuario
          this.api.getBooksByUserId(idUser).subscribe(books => {
            console.log("Libros comprados por el usuario:", books);
            this.allSales = books; // Actualiza el arreglo de libros comprados
          });
        } else {
          console.error("No se pudo obtener el ID del usuario");
          // Manejar el caso en que idUser es null, si es necesario
        }
      });
      


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
  
  //para compras y comprasRealizadas encontrar el libro y sacarle el titulo, autor, la fecha de allSales
  //Para comprasAux encontrar el libro y sacarle el titulo, autor, genre la fecha de allSales
  //crea un metodo de getBookById
  compras = [
    { imageUrl: '/../portraitBook.jpg', title: 'El extranjero', author: 'Albert Camus', date: '13/07/2021' },
    { imageUrl: '/../portraitBook.jpg', title: 'El extranjero', author: 'Albert Camus', date: '13/07/2021' }
  ];

  comprasAux = [
    { imageUrl: '/../portraitBook.jpg', title: 'El extranjero', author: 'Albert Camus', genre: 'terror', date: '13/07/2021' },
    { imageUrl: '/../portraitBook.jpg', title: 'El extranjero', author: 'Albert Camus', genre: 'terror', date: '13/07/2021' }
  ];

  comprasRealizadas = [
    { imageUrl: '/../portraitBook.jpg', title: 'El libro negro', author: 'Ángel David Revilla Lenoci', date: '2023-07-12' },
    { imageUrl: '/../portraitBook.jpg', title: 'El libro verde', author: 'Juan Carlos Bodoque', date: '2023-07-13' },
    { imageUrl: '/../portraitBook.jpg', title: 'El libro rojo', author: 'Juan Carlos Bodoque', date: '2023-07-13' },
  ];
}
