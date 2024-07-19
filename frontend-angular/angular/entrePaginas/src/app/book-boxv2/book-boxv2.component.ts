import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-book-boxv2',
  templateUrl: './book-boxv2.component.html',
  styleUrl: './book-boxv2.component.css'
})
export class BookBoxv2Component {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() author: string = '';
  @Input() price: number = 0;
  @Input() year: number = 0;
  @Input() category: string = '';

}
