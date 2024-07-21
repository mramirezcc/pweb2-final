import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isRegistered: boolean = false;
  username: string = 'default';
  constructor(private router: Router) { }

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
