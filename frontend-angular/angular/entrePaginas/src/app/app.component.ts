import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Book } from './book.model'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})
export class AppComponent {
  title = 'entrePaginas';
  
  books: Book[] = [];
  
  
  constructor(private api:ApiService) {
    this.getBooks();
  }

  getBooks = () => {
    this.api.getAllBooks().subscribe (
      data => {
        console.log(data);
        this.books = data;  //data.results;
      },
      error => {
        console.log(error);
      })  
    } 

}
