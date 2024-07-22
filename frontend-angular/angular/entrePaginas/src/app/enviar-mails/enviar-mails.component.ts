import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { ApiService } from '../api.service';
interface SelectableUser extends User {
  selected?: boolean;
}
@Component({
  selector: 'app-enviar-mails',
  templateUrl: './enviar-mails.component.html',
  styleUrls: ['./enviar-mails.component.css']
})
export class EnviarMailsComponent implements OnInit {


  clients: SelectableUser[] = [];
  selectAll: boolean = false;
  subject: string = '';
  message: string = '';
  successMessage: string | undefined;
  errorMessage: string | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.apiService.getAllUsers().subscribe(
      (users: User[]) => {
        this.clients = users.map(user => ({ ...user, selected: false }));
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
  toggleSelectAll() {
    this.clients.forEach(client => client.selected = this.selectAll);
  }


  onSubmit(): void {
    if (confirm("Desea enviar correo a los clientes seleccionados")) {
      const selectedClients = this.clients.filter(client => client.selected);
      this.apiService.sendEmail(selectedClients, this.subject, this.message)
        .subscribe(
          response => {
            this.successMessage = 'Email sent successfully!';
            this.errorMessage = '';
          },
          error => {
            this.successMessage = '';
            this.errorMessage = 'Failed to send email.';
          }
        );
    }
  }
}