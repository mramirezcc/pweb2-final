import { Component, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../user.model';
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
  @Input() user: User = {
    portrait: '',
    username: '',
    email: '',
    password: '',
    number: '',
    address: ''
  }

  @Output() toggleEdit = new EventEmitter<void>();


  onEditClick(): void {
    console.log('Editar información');
    this.toggleEdit.emit();
  }


}
