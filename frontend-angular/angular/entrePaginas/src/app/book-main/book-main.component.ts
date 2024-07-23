import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from '../book.model';
import { User } from '../user.model';
@Component({
  selector: 'app-book-main',
  templateUrl: './book-main.component.html',
  styleUrls: ['./book-main.component.css']
})
export class BookMainComponent implements OnInit {
  nombre: string = '';
  autor: string = '';
  categoria: string = '';
  minY: number = 0;
  maxY: number = 0;
  minPrice: number = 0;
  maxPrice: number = 0;

  categorias = ['','N/A', 'Suspenso', 'Romance', 'CienciaFiccion', 'Aventura', 'Fantasía', 'Acción'];

  filterForm: FormGroup;
  showAdvancedSearch: boolean = false;

  selectedBook: Book | null = null;
  toggleBookDetails: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      nombre: [''],
      autor: [''],
      categoria: [''],
      minY: [''],
      maxY: [''],
      minPrice: [''],
      maxPrice: ['']
    });
  }

  

  checkUserSession(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user) as User;
      console.log("Usuario enviado?: " + userData);
      alert(userData.username);
    }else{
      alert("No hay usuario!");
    }
  }

  ngOnInit(): void {
    this.checkUserSession();

    this.route.queryParamMap.subscribe(params => {
      this.nombre = params.get('nombre') || '';
      this.autor = params.get('autor') || '';
      this.categoria = params.get('categoria') || '';
      this.minY = params.get('minY') ? parseInt(params.get('minY')!, 10) : 0;
      this.maxY = params.get('maxY') ? parseInt(params.get('maxY')!, 10) : 0;
      this.minPrice = params.get('minPrice') ? parseInt(params.get('minPrice')!, 10) : 0;
      this.maxPrice = params.get('maxPrice') ? parseInt(params.get('maxPrice')!, 10) : 0;

      this.filterForm.patchValue({
        nombre: this.nombre,
        autor: this.autor,
        categoria: this.categoria,
        minY: this.minY,
        maxY: this.maxY,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      });
    });
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.router.navigate(['/libros'], {
      queryParams: {
        nombre: this.filterForm.value.nombre,
        autor: this.filterForm.value.autor,
        categoria: target.value,
        minY: this.filterForm.value.minY,
        maxY: this.filterForm.value.maxY,
        minPrice: this.filterForm.value.minPrice,
        maxPrice: this.filterForm.value.maxPrice
      }
    });
  }

  onFilterChange() {
    const { nombre, autor, categoria, minY, maxY, minPrice, maxPrice } = this.filterForm.value;
    this.router.navigate(['/libros'], {
      queryParams: {
        nombre,
        autor,
        categoria,
        minY,
        maxY,
        minPrice,
        maxPrice
      }
    });
  }

  selectBook(book: Book) {
    this.selectedBook = book;
    this.toggleBookDetails = true;
  }

  returnHome() {
    this.toggleBookDetails = false;
    this.selectedBook = null;
  }

  backHome() {
    window.location.href = "/";
  }
}
