import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'entrePaginas';

  compras = [
    { imageUrl: '/../portraitBook.jpg', title: 'El extranjero', author: 'Albert Camus', date: '13/07/2021' },
    { imageUrl: '/../portraitBook.jpg', title: 'El extranjero', author: 'Albert Camus', date: '13/07/2021' }
  ];

  comprasAux = [
    { imageUrl: '/../portraitBook.jpg', title: 'El extranjero', author: 'Albert Camus', genre: 'terror', date: '13/07/2021' },
    { imageUrl: '/../portraitBook.jpg', title: 'El extranjero', author: 'Albert Camus', genre: 'terror', date: '13/07/2021' }
  ];
}
