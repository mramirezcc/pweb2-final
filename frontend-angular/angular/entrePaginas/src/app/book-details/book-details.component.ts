import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router

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
  @Input() category: string = '';
  
  @Output() toogleBookDetail = new EventEmitter<void>();


  addToCart() {
    console.log('Añadir al carrito');
  }
  goBack() {
    console.log("saliendo");
    this.toogleBookDetail.emit();
  }
}