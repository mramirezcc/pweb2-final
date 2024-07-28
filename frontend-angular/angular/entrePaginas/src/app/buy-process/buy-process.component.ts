import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buy-process',
  templateUrl: './buy-process.component.html',
  styleUrl: './buy-process.component.css'
})
export class BuyProcessComponent {
  //generar un imput para mostrar el pago a realizar y mostrarlo!
  @Input() toPay: number | undefined;
  @Input() buyCode: string | undefined;
  @Output() purchaseConfirmed: EventEmitter<void> = new EventEmitter<void>();

  code: string[] = ['', '', '', '', '', ''];

  checkCode() {
    const enteredCode = this.code.join('');
    if (enteredCode === this.buyCode) {
      console.log('Código correcto:', enteredCode);
      alert('Código correcto. ¡Compra exitosa!');
      this.purchaseConfirmed.emit();  // Emitir el evento para continuar con la compra!
      
    } else {
      console.log('Código incorrecto:', enteredCode);
      alert('Código incorrecto. Inténtalo de nuevo.');
    }
  }
}
