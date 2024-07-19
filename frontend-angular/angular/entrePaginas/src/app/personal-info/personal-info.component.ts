import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() phone: string = '';
  @Input() country: string = '';
  @Input() city: string = '';
  @Input() state: string = '';
  @Input() address: string= '';

  onEditClick() {
    console.log('Editar información');
  }
}
