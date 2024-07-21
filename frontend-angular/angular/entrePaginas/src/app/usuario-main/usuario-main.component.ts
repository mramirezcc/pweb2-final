import { Component, OnInit } from '@angular/core';
import { User } from '../user.model'
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute

@Component({
  selector: 'app-usuario-main',
  templateUrl: './usuario-main.component.html',
  styleUrl: './usuario-main.component.css'
})
export class UsuarioMainComponent implements OnInit{
  user: User = {
    portrait: '',
    username: '',
    email: '',
    password: '',
    number: '',
    address: ''
  };
  showEdit: boolean = false;
  constructor(private route: ActivatedRoute) {} // Inyecta ActivatedRoute

  toggleEdit(): void {
      this.showEdit = !this.showEdit;
  }
  atras(): void{
    window.location.href = '/'; 

  }
  ngOnInit(): void {
      //necesita iniciar con un usuario!!!
      this.user = history.state.user;
      if (this.user) {
        console.log("Usuario recibido:", this.user);
        alert("waos!");
      } else {
        console.log("No se recibió ningún usuario");
      }
  }

 
  
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
