import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-compras-historial',
  templateUrl: './compras-historial.component.html',
  styleUrl: './compras-historial.component.css'
})
export class ComprasHistorialComponent {
  @Input() compras: { imageUrl: string, title: string, author: string, date: string }[] = [];
  eliminarCompras(){
    console.log("Funcion para eliminar las compras en la base de datos");
    alert("borrando");
  }
}
