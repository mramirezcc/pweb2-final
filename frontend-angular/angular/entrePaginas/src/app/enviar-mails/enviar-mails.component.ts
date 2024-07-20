import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enviar-mails',
  templateUrl: './enviar-mails.component.html',
  styleUrls: ['./enviar-mails.component.css']
})
export class EnviarMailsComponent implements OnInit {
  clients = [
    { id: 1, name: 'Cliente A', email: 'clienteA@example.com', selected: false },
    { id: 2, name: 'Cliente B', email: 'clienteB@example.com', selected: false },
    { id: 3, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 4, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 5, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 6, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 7, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 8, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 9, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 10, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 11, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 12, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 13, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 14, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 15, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 16, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 17, name: 'Cliente C', email: 'clienteC@example.com', selected: false },
    { id: 18, name: 'Cliente C', email: 'clienteC@example.com', selected: false },

    // Agrega más clientes según sea necesario
  ];

  selectAll: boolean = false;
  subject: string = '';
  message: string = '';

  ngOnInit(): void {
  }

  toggleSelectAll() {
    this.clients.forEach(client => client.selected = this.selectAll);
  }

  onSubmit() {
    const selectedClients = this.clients.filter(client => client.selected);
    console.log({
      selectedClients,
      subject: this.subject,
      message: this.message
    });
  }
}
