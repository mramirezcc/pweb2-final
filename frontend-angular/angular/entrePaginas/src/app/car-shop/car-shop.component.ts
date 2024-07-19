import { Component } from '@angular/core';
interface Libro {
  titulo: string;
  autor: string;
  precio: number;
  cantidad: number;
  imagenUrl: string;
}

@Component({
  selector: 'app-car-shop',
  templateUrl: './car-shop.component.html',
  styleUrl: './car-shop.component.css'
})
export class CarShopComponent {
  libros: Libro[] = [
    { titulo: 'El libro negro', autor: 'Ángel David Revilla Lenoci', precio: 681, cantidad: 1, imagenUrl: '/../../portraitBook.jpg' },
    { titulo: 'El libro verde', autor: 'Juan Carlos Bodoque', precio: 681, cantidad: 1, imagenUrl: '/../../portraitBook.jpg'  },
    { titulo: 'El libro rojo', autor: 'Juan Carlos Bodoque', precio: 681, cantidad: 1, imagenUrl: '/../../portraitBook.jpg'  },
  ];
  get subtotal(): number {
    return this.libros.reduce((acc, libro) => acc + libro.precio * libro.cantidad, 0);
  }
  get igv(): number{
    return this.total*0.18;
  }
  get total(): number {
    return this.subtotal; 
  }

  incrementarCantidad(libro: Libro) {
    libro.cantidad++;
  }

  disminuirCantidad(libro: Libro) {
    if (libro.cantidad > 1) {
      libro.cantidad--;
    }
  }

  eliminarLibro(libro: Libro) {
    this.libros = this.libros.filter(l => l !== libro);
  }

  regresar() {
    // return
  }
}
