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
    this.getBooks(); // Llamar a getBooks() en lugar de asignar directamente this.books1
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nombre'] || changes['autor'] || changes['categoria'] || changes['minY'] || changes['maxY'] || changes['minPrice'] || changes['maxPrice']) {
      this.applyFilters();
    }
  }

  getBooks(): void {
    this.api.getAllBooks().subscribe(
      (data: any) => {
        this.books1 = data; // Asignar los datos recibidos a this.books1
        this.applyFilters(); // Aplicar los filtros después de obtener los datos
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
        (this.categoria ? book.cathegory.toLowerCase().includes(this.categoria.toLowerCase()) : true) &&
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