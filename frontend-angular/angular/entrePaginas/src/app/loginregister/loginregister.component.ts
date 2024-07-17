import { Component } from '@angular/core';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.css']
})
export class LoginRegisterComponent {
  isLoginActive: boolean = true;

  toggleForms() {
    this.isLoginActive = !this.isLoginActive;
  }
}
