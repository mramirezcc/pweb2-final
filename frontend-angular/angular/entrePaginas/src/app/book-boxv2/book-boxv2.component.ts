import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-boxv2',
  templateUrl: './book-boxv2.component.html',
  styleUrls: ['./book-boxv2.component.css']
})
export class BookBoxv2Component {
  @Input() book: Book = {
    id: -1,
    portrait: '',
    name: '',
    author: '',
    cathegory: '',
    summary: '',
    price: 0,
    year: 0,
  };

  @Output() bookSelected = new EventEmitter<Book>();

  openDetails() {
    this.bookSelected.emit(this.book);
  }

  getCategoryClass(category: string): string {
    switch (category.toLowerCase()) {
      case 'suspenso':
        return 'category-suspenso';
      case 'romance':
        return 'category-romance';
      case 'cienciaficcion':
        return 'category-ciencia-ficcion';
      case 'aventura':
        return 'category-aventura';
      case 'fantasía':
        return 'category-fantasia';
      case 'acción':
        return 'category-accion';
      default:
        return 'category-na';
    }
  }
}
