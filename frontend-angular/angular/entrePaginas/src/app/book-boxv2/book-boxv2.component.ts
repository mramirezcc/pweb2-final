import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-boxv2',
  templateUrl: './book-boxv2.component.html',
  styleUrl: './book-boxv2.component.css'
})
export class BookBoxv2Component {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() category: string = '';
  @Input() summary: string = '';
  @Input() price: number = 0;
  @Input() year: number = 0;
  @Output() bookSelected = new EventEmitter<any>();

  openDetails(){
    console.log("waos");
    this.bookSelected.emit({
      imageUrl: this.imageUrl,
      title: this.title,
      author: this.author,
      summary: this.summary,
      price: this.price,
      year: this.year,
      category: this.category
    });
  }
}
