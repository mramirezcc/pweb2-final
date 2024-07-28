import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Book } from "../book.model"
import { User } from '../user.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  @Input() book: Book | null = null; 
  constructor(private router: Router, private api: ApiService) { }

  isUserLoggedIn: boolean = false;
  messageContent: string = '';

  ngOnInit(): void {
    this.checkUserSession();
  }
  userData: User | null = null;
  
  checkUserSession(): void {
    const user = sessionStorage.getItem('user');
    
    if (user) {
      this.userData = JSON.parse(user) as User;
      this.isUserLoggedIn = true;
      console.log("Usuario que pone a carrito: " + this.userData.username);
    } else {
      this.isUserLoggedIn = false;
      console.log("No hay usuario!");
    }
  }



  addToCart() {
    if(this.isUserLoggedIn && this.userData && this.book){
      if(this.book.stock <= 0){
        alert("No hay stock de ese libro!");
        return;

      }
      console.log("Se añade el libro ", this.book?.name, " al carrito de ", this.userData?.username);
      this.api.addBookToCart(this.userData.id, this.book.id).subscribe(
        response => {
          console.log("Libro añadido al carrito:", response);
          alert("Libro añadido al carrito!");
        },
        error => {
          console.error("Error al añadir el libro al carrito:", error);
          alert("Error al añadir el libro al carrito.");
        }
      );
    }else{
      alert("No esta registrado!");
    }


  }
  @Output() toggleBookDetails = new EventEmitter<void>();

  closeDetails() {
    this.toggleBookDetails.emit();
  }
}