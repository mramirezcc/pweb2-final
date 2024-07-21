import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-boxv1',
  templateUrl: './book-boxv1.component.html',
  styleUrl: './book-boxv1.component.css'
})
export class BookBoxv1Component {
  @Input() portrait: string = '';
  @Input() name: string = '';
  @Input() author: string = '';
  @Input() price: number = 0;
}
