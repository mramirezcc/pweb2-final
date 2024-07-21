import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-subir-libro',
  templateUrl: './subir-libro.component.html',
  styleUrl: './subir-libro.component.css'
})
export class SubirLibroComponent {
  categories = ['Ficción', 'No Ficción', 'Ciencia', 'Historia', 'Fantasía']; // Ejemplo de categorías

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
    } else {
      console.error('Formulario no válido');
    }
  }
}
