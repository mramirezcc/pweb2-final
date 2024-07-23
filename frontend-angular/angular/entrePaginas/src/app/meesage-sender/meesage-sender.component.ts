import { Component, OnInit } from '@angular/core';
import { User } from "../user.model";

@Component({
  selector: 'app-meesage-sender',
  templateUrl: './meesage-sender.component.html',
  styleUrls: ['./meesage-sender.component.css']
})
export class MeesageSenderComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  messageContent: string = '';

  ngOnInit(): void {
    this.checkUserSession();
  }

  checkUserSession(): void {
    const user = sessionStorage.getItem('user');
    
    if (user) {
      const userData = JSON.parse(user) as User;
      this.isUserLoggedIn = true;
      console.log("Usuario enviado?: " + userData.username);
    } else {
      this.isUserLoggedIn = false;
      console.log("No hay usuario!");
    }
  }

  sendMessage(): void {
    if (this.messageContent.trim() !== '') {
      // Aquí puedes agregar la lógica para enviar el mensaje
      alert("Mensaje enviado: " + this.messageContent);
      this.messageContent = ''; // Limpiar el contenido del mensaje después de enviarlo
    } else {
      alert("Por favor, escribe un mensaje antes de enviar.");
    }
  }
}
