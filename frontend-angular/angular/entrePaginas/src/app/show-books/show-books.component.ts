import { Component, Input, OnInit } from '@angular/core';

interface Book {
  imageUrl: string;
  title: string;
  author: string;
  price: number;
}


@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrl: './show-books.component.css'
})
export class ShowBooksComponent {
  @Input() books: Book[] = [
    {
      imageUrl: '/../portraitBook.jpg',
      title: 'Metafizik',
      author: 'Aristoteles',
      price: 36.00
    },
    
    // Agrega más libros según sea necesario
  ];
  //obtener los datos de la base de datos!!!
  constructor() {}

  ngOnInit(): void {}
}
