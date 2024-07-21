import { Component, Input, OnInit } from '@angular/core';

import { Book } from '../book.model'; // Ajusta la ruta según sea necesario


@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrl: './show-books.component.css'
})
export class ShowBooksComponent {
  @Input() books1: Book[] = [];
  
  constructor() {}

  ngOnInit(): void {
    console.log("Recibiendo los libros ", this.books1)
  }
}
