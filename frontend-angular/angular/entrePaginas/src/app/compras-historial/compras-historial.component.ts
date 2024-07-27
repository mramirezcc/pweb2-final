import { Component, Input } from '@angular/core';
import { Compra } from '../compra.model';
@Component({
  selector: 'app-compras-historial',
  templateUrl: './compras-historial.component.html',
  styleUrl: './compras-historial.component.css'
})
export class ComprasHistorialComponent {
  @Input() compras: Compra[] = [];

  eliminarCompras(){
    console.log("Funcion para eliminar las compras en la base de datos");
    alert("borrando");
  }
}
