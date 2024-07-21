import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book.model'; // Ajusta la ruta según sea necesario
import { ApiService } from '../api.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isRegistered: boolean = false;
  username: string = 'default';

  books: Book[] = [];

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.api.getAllBooks().subscribe(
      data => {
        this.books = data; // data.results;
        console.log("Los datos recibidos son: ", data);

      },
      error => {
        console.log(error);
      }
    );  
  }
  //al ser generado recibe del backend si el usuario esta registrado y si lo esta obtener el username



  showAdvancedSearch: boolean = false;

  toggleAdvancedSearch(): void {
    console.log("called?");
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  redirectBooks(nombre: string, autor: string, categoria: string, editorial: string, minY: number, maxY: number, minPrice: number, maxPrice: number): void {
    this.router.navigate(['/libros'], { queryParams: { nombre, autor, categoria, editorial, minY, maxY, minPrice, maxPrice } });
  }

}
