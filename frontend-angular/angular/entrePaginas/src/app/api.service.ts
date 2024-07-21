import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user.model'; // Asegúrate de que la ruta sea correcta
import { catchError, map } from 'rxjs/operators';



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
          return of(null); // Devuelve null en caso de error
        })
      );
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseurl}/users/`, { headers: this.httpHeaders })
      .pipe(
        catchError(error => {
          console.error('Error fetching users:', error);
          return of([]); // Devuelve un array vacío en caso de error
        })
      );
  }
  sendEmail(selectedClients: any[], subject: string, message: string): Observable<any> {
    const body = { selectedClients, subject, message };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseurl}/send-email/`, body, { headers: this.httpHeaders }); // Actualizado
  }

}