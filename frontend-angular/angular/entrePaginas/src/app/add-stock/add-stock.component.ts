import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Book } from '../book.model'; // Asegúrate de tener el modelo Book definido

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
        console.error('Error fetching books:', error);
      }
    );
  }

  addStock(bookId: number): void {
    const quantity = this.newStock[bookId];
    if (quantity > 0) {
      this.apiService.incrementBookStock(bookId, quantity).subscribe(
        response => {
          console.log('Stock incremented successfully:', response);
          // Actualiza el stock del libro en la lista
          const book = this.books.find(b => b.id === bookId);
          if (book) {
            book.stock += quantity;
          }
        },
        error => {
          console.error('Error incrementing stock:', error);
        }
      );
    } else {
      alert('Please enter a valid quantity');
    }
  }
}
