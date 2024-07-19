import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';

interface Compra {
  imageUrl: string;
  title: string;
  author: string;
  date: string;
}

@Component({
  selector: 'app-compras-grafico',
  templateUrl: './compras-grafico.component.html',
  styleUrls: ['./compras-grafico.component.css']
})
export class ComprasGraficoComponent implements OnInit, AfterViewInit {
  @Input() compras: Compra[] = [];
  chart: any;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.generarGrafico();
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
}
