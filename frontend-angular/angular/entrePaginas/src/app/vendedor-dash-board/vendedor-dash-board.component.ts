import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';

@Component({
  selector: 'app-vendedor-dash-board',
  templateUrl: './vendedor-dash-board.component.html',
  styleUrls: ['./vendedor-dash-board.component.css']
})
export class VendedorDashBoardComponent implements OnInit {
  buyersCount = 100;
  booksByPublisherChart: any;
  booksByCategoryChart: any;
  salesRecordChart: any;
  topBuyersChart: any;

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    this.createBooksByPublisherChart();
    this.createBooksByCategoryChart();
    this.createSalesRecordChart();
    this.createTopBuyersChart();
  }

  createBooksByPublisherChart(): void {
    const ctx = document.getElementById('booksByPublisherChart') as ChartItem;
    this.booksByPublisherChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Editorial A', 'Editorial B', 'Editorial C'],
        datasets: [{
          data: [30, 50, 20],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    });
  }

  createBooksByCategoryChart(): void {
    const ctx = document.getElementById('booksByCategoryChart') as ChartItem;
    this.booksByCategoryChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Ficción', 'No Ficción', 'Ciencia'],
        datasets: [{
          data: [40, 35, 25],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    });
  }

  createSalesRecordChart(): void {
    const ctx = document.getElementById('salesRecordChart') as ChartItem;
    this.salesRecordChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
          label: 'Ventas',
          data: [1500, 1800, 1200, 2200, 2000],
          borderColor: '#36A2EB',
          fill: false
        }]
      }
    });
  }

  createTopBuyersChart(): void {
    const ctx = document.getElementById('topBuyersChart') as ChartItem;
    this.topBuyersChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Cliente A', 'Cliente B', 'Cliente C'],
        datasets: [{
          label: 'Mayores compradores',
          data: [500, 700, 450],
          backgroundColor: '#FF6384'
        }]
      }
    });
  }
}
