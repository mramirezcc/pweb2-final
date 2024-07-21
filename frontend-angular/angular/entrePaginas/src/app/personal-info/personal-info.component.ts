import { Component, Input, Output, EventEmitter} from '@angular/core';

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
  @Output() toggleEdit = new EventEmitter<void>();


  onEditClick(): void {
    console.log('Editar información');
    this.toggleEdit.emit();
  }
}
