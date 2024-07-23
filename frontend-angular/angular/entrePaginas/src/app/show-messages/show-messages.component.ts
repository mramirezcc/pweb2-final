import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Message } from '../message.model';
import { User } from '../user.model';
@Component({
  selector: 'app-show-messages',
  templateUrl: './show-messages.component.html',
  styleUrl: './show-messages.component.css'
})
export class ShowMessagesComponent {
  messages: Message[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    console.log("Mensajes");
    this.loadTestData();



    //llamada para obtener los mensajes!
    //this.apiService.getMessages().subscribe((data: Message[]) => {
    //  this.messages = data;
    //});
  }
  loadTestData(): void {
    const user1: User = {
      portrait: 'https://via.placeholder.com/80',
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'password123',
      number: '1234567890',
      address: '123 Main St'
    };

    const user2: User = {
      portrait: 'https://via.placeholder.com/80',
      username: 'jane_smith',
      email: 'jane.smith@example.com',
      password: 'password456',
      number: '0987654321',
      address: '456 Oak Ave'
    };

    this.messages = [
      {
        message: 'Hola, ¿cómo estás?',
        sender: user1,
        date: new Date('2024-07-20T14:48:00')
      },
      {
        message: 'Estoy bien, gracias. ¿Y tú?',
        sender: user2,
        date: new Date('2024-07-20T14:50:00')
      },
      {
        message: 'Todo bien por aquí. ¿Alguna novedad?',
        sender: user1,
        date: new Date('2024-07-21T10:15:00')
      }
    ];
  }
}
