import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';
import { Compra } from '../compra.model';

@Component({
  selector: 'app-compras-grafico',
  templateUrl: './compras-grafico.component.html',
  styleUrls: ['./compras-grafico.component.css']
})
export class ComprasGraficoComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() compras: Compra[] = [];
  chart: any;

  ngOnInit() {}

  ngAfterViewInit() {
    this.generarGrafico();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['compras'] && !changes['compras'].isFirstChange()) {
      this.actualizarGrafico();
    }
  }

  generarGrafico() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d') as ChartItem;
    if (!ctx) {
      return;
    }

    const data = this.procesarDatos(this.compras);
    
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.fechas,
        datasets: [{
          label: 'Número de Compras',
          data: data.valores,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Número de Compras'
            },
            ticks: {
              stepSize: 1, // Mostrar solo enteros
              callback: function(value: number | string) {
                if (Number.isInteger(value)) {
                  return value;
                }
                return null; // Return null to skip non-integer values
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  actualizarGrafico() {
    if (this.chart) {
      const data = this.procesarDatos(this.compras);
      this.chart.data.labels = data.fechas;
      this.chart.data.datasets[0].data = data.valores;
      this.chart.update();
    }
  }

  procesarDatos(compras: Compra[]) {
    const conteoCompras: { [fecha: string]: number } = {};

    compras.forEach(compra => {
      const fecha = compra.date;
      if (conteoCompras[fecha]) {
        conteoCompras[fecha]++;
      } else {
        conteoCompras[fecha] = 1;
      }
    });

    return {
      fechas: Object.keys(conteoCompras),
      valores: Object.values(conteoCompras)
    };
  }

  eliminarCompras() {
    console.log("Funcion para eliminar las compras en la base de datos");
    alert("Borrando");
  }
}
