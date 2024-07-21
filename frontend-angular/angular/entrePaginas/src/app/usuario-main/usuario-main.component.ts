import { Component, OnInit } from '@angular/core';
import { User } from '../user.model'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-main',
  templateUrl: './usuario-main.component.html',
  styleUrl: './usuario-main.component.css'
})
export class UsuarioMainComponent implements OnInit{
  user: User = { //recibir ese user!
    portrait: '',
    username: '',
    email: '',
    password: '',
    number: '',
    address: ''
  };

  showEdit: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) {}

  toggleEdit(): void {
      this.showEdit = !this.showEdit;
  }
  atras(): void{
    this.router.navigate(['/']);  // Usar el router en lugar de window.location.href

  }
  ngOnInit(): void {
      //necesita iniciar con un usuario!!!
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
