import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Book } from './book.model'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})
export class AppComponent {
  title = 'entrePaginas';
  
  
  
  constructor(private api:ApiService) {
  }



}
