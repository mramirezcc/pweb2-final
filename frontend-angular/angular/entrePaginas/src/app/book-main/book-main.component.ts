import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  categorias = ['Ficción', 'No Ficción', 'Misterio', 'Fantasía', 'Romance'];

  filterForm: FormGroup;
  showAdvancedSearch: boolean = false;

  selectedBook: any; 

  toogleBookDetail: boolean = false;
  selectBook(book: any) {
    this.selectedBook = book;
    this.toogleBookDetail = true;
    console.log("Book selected: ", book, this.toogleBookDetail);
    //mostrar el book detail con los datos de book
  }

  returnHome() {
    this.toogleBookDetail = false;
    this.selectedBook = null;
  }
  backHome() {
    window.location.href = "/.";
  }
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      nombre: [''],
      autor: [''],
      minY: [''],
      maxY: [''],
      minPrice: [''],
      maxPrice: ['']
    });
  }

  ngOnInit(): void {
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
        nombre: this.nombre,
        autor: this.autor,
        categoria: target.value,
        minY: this.minY,
        maxY: this.maxY,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      }
    });
  }

  onFilterChange() {
    const { nombre, autor, minY, maxY, minPrice, maxPrice } = this.filterForm.value;
    this.router.navigate(['/libros'], {
      queryParams: {
        nombre,
        autor,
        categoria: this.categoria,
        minY,
        maxY,
        minPrice,
        maxPrice
      }
    });
  }


}
