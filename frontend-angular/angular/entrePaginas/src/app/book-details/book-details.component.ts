import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Book } from "../book.model"

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  @Input() book: Book | null = null; 



  addToCart() {
    console.log('Añadir al carrito');
  }
  @Output() toggleBookDetails = new EventEmitter<void>();

  closeDetails() {
    this.toggleBookDetails.emit();
  }
}