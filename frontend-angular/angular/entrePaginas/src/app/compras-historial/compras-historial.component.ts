import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-compras-historial',
  templateUrl: './compras-historial.component.html',
  styleUrl: './compras-historial.component.css'
})
export class ComprasHistorialComponent {
  @Input() compras: { title: string, author: string, genre: string, date: string }[] = [];
   
  eliminarCompras(){
    console.log("Funcion para eliminar las compras en la base de datos");
    alert("borrando");
  }
}
