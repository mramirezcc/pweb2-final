import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Book } from "../book.model";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnChanges {
  @Input() nombre: string = '';
  @Input() autor: string = '';
  @Input() categoria: string = '';
  @Input() minY: number = 0;
  @Input() maxY: number = 0;
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 0;

  @Output() toggleBookDetails = new EventEmitter<Book>();

  books1: Book[] = [];
  filteredBooks: Book[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.books1 = [
      {
        portrait: 'https://example.com/book1.jpg',
        name: 'Book One',
        author: 'Author One',
        price: 15.99,
        category: 'Romance',
        summary: 'Summary of Book One',
        year: 2020
      },
      {
        portrait: 'https://example.com/book2.jpg',
        name: 'Book Two',
        author: 'Author Two',
        price: 20.00,
        category: 'Misterio',
        summary: 'Summary of Book Two',
        year: 2018
      },
      {
        portrait: 'https://example.com/book3.jpg',
        name: 'Book Three',
        author: 'Author Three',
        price: 10.50,
        category: 'Fantasía',
        summary: 'Summary of Book Three',
        year: 2021
      }
      ,
      {
        portrait: 'https://example.com/book3.jpg',
        name: 'Book Four',
        author: 'Author Three',
        price: 10.50,
        category: 'Fantasía',
        summary: 'Summary of Book Three',
        year: 2021
      }
      ,
      {
        portrait: 'https://example.com/book3.jpg',
        name: 'Book Five',
        author: 'Author Three',
        price: 10.50,
        category: 'Fantasía',
        summary: 'Summary of Book Three',
        year: 2021
      }
      ,
      {
        portrait: 'https://example.com/book3.jpg',
        name: 'Book Six',
        author: 'Author One',
        price: 10.50,
        category: 'Fantasía',
        summary: 'Summary of Book Three',
        year: 2021
      }
    ];

    this.applyFilters();
    // Uncomment to fetch books from an API
    // this.getBooks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if any of the input properties have changed
    if (changes['nombre'] || changes['autor'] || changes['categoria'] || changes['minY'] || changes['maxY'] || changes['minPrice'] || changes['maxPrice']) {
      this.applyFilters();
    }
  }
  getBooks(): void {
    this.api.getAllBooks().subscribe(
      data => {
        this.books1 = data;
        this.applyFilters();
        console.log("Los datos recibidos son: ", data);
      },
      error => {
        console.log(error);
      }
    );  
  }

  applyFilters(): void {
    this.filteredBooks = this.books1.filter(book => {
      return (
        (this.nombre ? book.name.toLowerCase().includes(this.nombre.toLowerCase()) : true) &&
        (this.autor ? book.author.toLowerCase().includes(this.autor.toLowerCase()) : true) &&
        (this.categoria ? book.category.toLowerCase().includes(this.categoria.toLowerCase()) : true) &&
        (this.minY ? book.year >= this.minY : true) &&
        (this.maxY ? book.year <= this.maxY : true) &&
        (this.minPrice ? book.price >= this.minPrice : true) &&
        (this.maxPrice ? book.price <= this.maxPrice : true)
      );
    });
  }

  bookSelected(book: Book): void {
    this.toggleBookDetails.emit(book);
  }
}
