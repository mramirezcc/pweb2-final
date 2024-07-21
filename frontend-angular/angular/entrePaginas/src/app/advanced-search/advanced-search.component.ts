import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent {
  searchData = {
    name: '',
    category: '',
    author: '',
    editorial: '',
    yearFrom: null,
    yearTo: null,
    priceMin: null,
    priceMax: null
  };
  categories = ['Ficción', 'No Ficción', 'Misterio', 'Fantasía', 'Romance'];

  constructor(private router: Router) {}

  onSearch() {
    const { name, category, author, editorial, yearFrom, yearTo, priceMin, priceMax } = this.searchData;
    this.router.navigate(['/libros'], {
      queryParams: {
        nombre: name,
        autor: author,
        categoria: category,
        editorial: editorial,
        minY: yearFrom,
        maxY: yearTo,
        minPrice: priceMin,
        maxPrice: priceMax
      }
    });
  }
}
