import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Message } from '../message.model';
import { User } from '../user.model';

interface MessageToDisplay{
  //tiene que tener un id del mensaje, para luego ser borrado!
  id:number;
  portrait: string;
  username: string;
  email: string;
  password: string;
  number: string; 
  address: string;
  message: String;
  date: Date;
}

@Component({
  selector: 'app-show-messages',
  templateUrl: './show-messages.component.html',
  styleUrls: ['./show-messages.component.css']
})
export class ShowMessagesComponent {
  messages: MessageToDisplay[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Simulación de carga de mensajes (en tu caso podría ser la llamada al API)
    this.loadTestData();
  }

  loadTestData(): void {
    this.apiService.showMessages().subscribe(
      (messagesApi: any) => {
        console.log(messagesApi);

        messagesApi.forEach((message: { message: any; sender: number; date: any; id: any; }) => {
          console.log(`Mensaje: ${message.message}`);
          console.log(`Remitente: ${message.sender}`);
          console.log(`Fecha: ${message.date}`);

          // Obtener el usuario por el id del remitente
          this.apiService.getUserById(message.sender).subscribe(
            (user: User) => {
              // Construir el objeto MessageToDisplay
              const messageToDisplay: MessageToDisplay = {
                id: message.id,
                portrait: user.portrait,
                username: user.username,
                email: user.email,
                password: user.password,
                number: user.number,
                address: user.address,
                message: message.message,
                date: message.date
              };

              // Añadir el mensaje al array de mensajes
              this.messages.push(messageToDisplay);
            },
            error => console.error('Error fetching user', error)
          );
        });
      },
      error => console.error('Error loading messages', error)
    );
  }

  deleteMessage(message: MessageToDisplay): void {
    this.apiService.deleteMessage(message.id).subscribe(
      response => {
        console.log('Message deleted', response);
        this.messages = this.messages.filter(m => m.id !== message.id);
      },
      error => console.error('Error deleting message', error)
    );
  }
}
