import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario-main',
  templateUrl: './usuario-main.component.html',
  styleUrl: './usuario-main.component.css'
})
export class UsuarioMainComponent {

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
