import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() registered: boolean = false; 
  isRegistered(): boolean {
    return this.registered;
  }
  redirectAdminLogin(){
    if(this.isRegistered()){

      alert("No puede acceder a esta opcion")
    }else{
      window.location.href = '/vendedorLogin'; 

    }
  }
}
