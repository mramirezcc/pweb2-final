import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  books: Book[] = [];
  newStock: { [key: number]: number } = {};

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.apiService.getAllBooks().subscribe(
      (response: Book[]) => {
        this.books = response;
      },
      error => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }

  addStock(bookId: number): void {
    const quantity = this.newStock[bookId];
    if (quantity > 0) {
      this.apiService.incrementBookStock(bookId, quantity).subscribe(
        response => {
          console.log('Stock incrementado con exito:', response);
          const book = this.books.find(b => b.id === bookId);
          if (book) {
            book.stock += quantity;
          }
        },
        error => {
          console.error('Error incrementando el stock:', error);
        }
      );
    } else {
      alert('Ingrese una cantidad positiva');
    }
  }
}
