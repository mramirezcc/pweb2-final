import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-subir-libro',
  templateUrl: './subir-libro.component.html',
  styleUrls: ['./subir-libro.component.css']
})
export class SubirLibroComponent {
  categories = ['N/A', 'Suspenso', 'Romance', 'Ciencia Ficción', 'Aventura', 'Fantasía', 'Acción'];
  selectedFile: File | null = null;

  constructor(private apiService: ApiService) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', form.value.name);
      formData.append('year', form.value.year);
      formData.append('author', form.value.author);
      formData.append('stock', form.value.stock);
      formData.append('price', form.value.price);
      formData.append('cathegory', form.value.category);
      formData.append('summary', form.value.summary);
      formData.append('portrait', this.selectedFile, this.selectedFile.name);

      this.apiService.createBook(formData).subscribe(
        response => {
          console.log('Libro subido con éxito', response);
        },
        error => {
          console.error('Error al subir el libro', error);
        }
      );
    } else {
      console.error('Formulario no válido');
    }
  }
}
