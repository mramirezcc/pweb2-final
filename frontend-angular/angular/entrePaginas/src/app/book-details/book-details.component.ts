import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() summary: string = '';
  @Input() year: number = 0;
  @Input() price: number = 0;
  @Input() categories: string[] = [];

  addToCart() {
    console.log('Añadir al carrito');
  }

  onCategoryClick(category: string) {
    console.log(`Categoría seleccionada: ${category}`);
  }

  goBack() {
    console.log('Volver a la página anterior');
  }
}