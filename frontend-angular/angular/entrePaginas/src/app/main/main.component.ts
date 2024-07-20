import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isRegistered: boolean = false;
  username: string = 'default';

  //al ser generado recibe del backend si el usuario esta registrado y si lo esta obtener el username

  showAdvancedSearch: boolean = false;

  toggleAdvancedSearch(): void {
    console.log("called?");
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }


}
