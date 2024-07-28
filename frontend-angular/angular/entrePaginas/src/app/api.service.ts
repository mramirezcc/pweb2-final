import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user.model';
import { catchError, map } from 'rxjs/operators';
import { Book } from './book.model';
interface BookToBuy {
  id: number; //es el id del libro!
  portrait: string;
  name: string;
  author: string;
  price: number;
  cathegory: string; 
  summary: string;
  year: number;
  amount: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseurl = "http://127.0.0.1:8000"; 
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }

  getAllBooks():Observable<any>{
    return this.http.get(this.baseurl+'/books/', 
    {headers: this.httpHeaders});
  }

  getAllSales():Observable<any>{
    return this.http.get(this.baseurl+'/sales/', 
    {headers: this.httpHeaders});
  }

  addUser(user: User, portraitFile: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('portrait', portraitFile);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('number', user.number);
    formData.append('address', user.address);
    console.log('usuario recibido:', user);
  
    return this.http.post<{ success: boolean }>(this.baseurl + '/users/', formData)
      .pipe(
        map(response => true),  // Siempre devuelve true si no hay error
        catchError(error => {
          console.error('Error adding user:', error);
          return of(false);  // Devuelve false solo en caso de error
        })
      );
  }

  //genera un nuevo servicio
  loginUser(username: string, password: string): Observable<User | null> {
    return this.http.post<{ user: User }>(`${this.baseurl}/login/`, { username, password }, { headers: this.httpHeaders })
      .pipe(
        map(response => response.user),
        catchError(error => {
          console.error('Error logging in user:', error);
          return of(null);
        })
      );
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseurl}/users/`, { headers: this.httpHeaders })
      .pipe(
        catchError(error => {
          console.error('Error fetching users:', error);
          return of([]);
        })
      );
  }
  sendEmail(selectedClients: any[], subject: string, message: string): Observable<any> {
    const body = { selectedClients, subject, message };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseurl}/send-email/`, body, { headers: this.httpHeaders }); // Actualizado
  } 

  getUserId(email: string): Observable<number | null> {
    return this.http.get<{ user_id: number }>(`${this.baseurl}/get_user_id/?email=${email}`, { headers: this.httpHeaders })
      .pipe(
        map(response => response.user_id),
        catchError(error => {
          console.error('Error fetching user ID:', error);
          return of(null);
        })
      );
  }
  getBooksByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/user-books/?userId=${userId}`, { headers: this.httpHeaders })
      .pipe(
        catchError(error => {
          console.error('Error fetching books by user ID:', error);
          return of([]);
        })
      );
  }
  getBookById(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/books/${bookId}/`, { headers: this.httpHeaders })
      .pipe(
        catchError(error => {
          console.error('Error fetching book by ID:', error);
          return of(null);
        })
      );
  }

  getBooksByUser(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseurl}/users/${userId}/books/`);
  }


  addBookToCart(userId: number, bookId: number): Observable<any> {
    const url = `${this.baseurl}/shopping-carts/${userId}/add-book/`;
    const body = { book_id: bookId };
    return this.http.post(url, body);
  }
  
  getBooksInCart(userId: number): Observable<any> {
    const url = `${this.baseurl}/shopping-carts/${userId}/`;
    return this.http.get<any>(url, { headers: this.httpHeaders });
 }

  removeBookFromCart(userId: number, bookId: number): Observable<any> {
    const url = `${this.baseurl}/shopping-carts/${userId}/remove-book/`;
    const body = { book_id: bookId };
    return this.http.post(url, body, { headers: this.httpHeaders });
  }


  sendMessage(sender: User, message: string): Observable<any> {
    const url = `${this.baseurl}/send-message/`;  // Ensure this matches your Django endpoint
    const body = {
      sender_id: sender.id,
      message: message
    };
    return this.http.post<any>(url, body, { headers: this.httpHeaders });
  }

  showMessages(): Observable<any> {
    const url = `${this.baseurl}/messages/`; 
    return this.http.get<any>(url, { headers: this.httpHeaders });
  }

  getUserById(userId: number): Observable<any>{
    const url = `${this.baseurl}/users/${userId}/`;
    return this.http.get<any>(url, { headers: this.httpHeaders });
  }
  deleteMessage(messageId: number): Observable<any> {
    const url = `${this.baseurl}/messages/delete/${messageId}/`;
    return this.http.delete(url, { headers: this.httpHeaders });
  }

  createBook(bookData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/create-book/`, bookData);
  }

  generatePdf(userId: number, books: BookToBuy[]): Observable<Blob> {
    return this.http.post(`${this.baseurl}/generate-pdf/${userId}/`, { books }, { responseType: 'blob' });
  }


}