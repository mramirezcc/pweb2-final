import { Component, Input, Output, EventEmitter} from '@angular/core';

interface Book {
  imageUrl: string;
  title: string;
  author: string;
  category: string;
  summary: string;
  year: number;
  price: number;
}

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent {
  @Input() nombre: string = '';
  @Input() autor: string = '';
  @Input() categoria: string = '';
  @Input() minY: number = 0;
  @Input() maxY: number = 0;
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 0;

  @Input() books: Book[] = [
    {
      imageUrl: '/../portraitBook.jpg',
      title: 'Metafizik',
      author: 'Aristoteles',
      category: "Terror",
      summary: "acdvadvdvadvadvadvadv",
      year: 2024,
      price: 36.00
    },
    {
      imageUrl: '/../portraitBook.jpg',
      title: 'asd',
      author: 'df',
      category: "qweasd",
      summary: "acdvadvdvadvadvadvadv",
      year: 2024,
      price: 36.00
    },
    {
      imageUrl: '/../portraitBook.jpg',
      title: 'qwe',
      author: 'df',
      category: "dfa",
      summary: "acdvadvdvadvadvadvadv",
      year: 2024,
      price: 36.00
    },
  ];
  @Output() toggleBookDetails = new EventEmitter<any>();

  bookSelected(book: any) {
    console.log("waos2", book);
    this.toggleBookDetails.emit(book);
    
  }

  constructor() {}

  ngOnInit(): void {}
}
