import { Component, OnInit } from '@angular/core';
import { User } from "../user.model";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-meesage-sender',
  templateUrl: './meesage-sender.component.html',
  styleUrls: ['./meesage-sender.component.css']
})
export class MeesageSenderComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  messageContent: string = '';
  userData: User | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.checkUserSession();
  }

  checkUserSession(): void {
    const user = sessionStorage.getItem('user');
    
    if (user) {
      this.userData = JSON.parse(user) as User;
      this.isUserLoggedIn = true;
      console.log("Usuario enviado?: " + this.userData.username);
    } else {
      this.isUserLoggedIn = false;
      console.log("No hay usuario!");
    }
  }

  sendMessage(): void {
    if (this.messageContent.trim() !== '' && this.userData) {
      this.apiService.sendMessage(this.userData, this.messageContent)
        .subscribe(response => {
          alert("Mensaje enviado: " + this.messageContent);
          this.messageContent = '';
        }, error => {
          alert("Error al enviar el mensaje.");
          console.error(error);
        });
    } else {
      alert("Por favor, escribe un mensaje antes de enviar.");
    }
  }
}
