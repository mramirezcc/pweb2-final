import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model'; // Asegúrate de que la ruta sea correcta
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseurl = "http://127.0.0.1:8000"; 
  httpHeaders = new      
  HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }

  getAllBooks():Observable<any>{
    return this.http.get(this.baseurl+'/books/', 
    {headers: this.httpHeaders});
  }

  addUser(user: User): Observable<boolean> {
    console.log("El usuario enviado es: ", user);
    
      return this.http.post<{ success: boolean }>(this.baseurl + '/users/', user, 
      { headers: this.httpHeaders }).pipe(
        map(response => response.success),
        catchError(error => {
          console.error('Error adding user:', error);
          return [false]; // Devuelve false en caso de error
        })
      );
    }
}
