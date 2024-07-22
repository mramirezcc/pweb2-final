import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book.model'; // Ajusta la ruta según sea necesario
import { User } from '../user.model'; // Ajusta la ruta según sea necesario
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isRegistered: boolean = false;
  username: string = 'default';
  books: Book[] = [];
  
  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.checkUserSession();
    this.getBooks();
  }

  checkUserSession(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user) as User;
      this.isRegistered = true;
      this.username = userData.username;
    }
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

  // al ser generado recibe del backend si el usuario está registrado y si lo está obtener el username
  userDebug: User = {
    portrait: '/../portraitBook.jpg',
    username: 'John asdasd',
    email: 'john.doe@example.com',
    password: 'password123',
    number: '1234567890',
    address: '1234 Main St, Anytown, USA'
  };

  showAdvancedSearch: boolean = false;

  toggleAdvancedSearch(): void {
    console.log("called?");
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  redirectBooks(nombre: string, autor: string, categoria: string, editorial: string, minY: number, maxY: number, minPrice: number, maxPrice: number): void {
    this.router.navigate(['/libros'], { queryParams: { nombre, autor, categoria, editorial, minY, maxY, minPrice, maxPrice } });
  }
}
