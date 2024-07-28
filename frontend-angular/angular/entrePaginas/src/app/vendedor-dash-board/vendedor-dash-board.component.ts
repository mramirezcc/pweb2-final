import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-vendedor-dash-board',
  templateUrl: './vendedor-dash-board.component.html',
  styleUrls: ['./vendedor-dash-board.component.css']
})
export class VendedorDashBoardComponent implements OnInit {
  buyersCount: number | undefined;
  booksByPublisherChart: any;
  booksByCategoryChart: any;
  salesRecordChart: any;
  topBuyersChart: any;
  constructor(private api: ApiService){}

  ngOnInit(): void {
    this.api.getAllUsers().subscribe(
      (users: any[]) => {
        this.buyersCount = users.length;
      },
      error => console.error('Error fetching users', error)
    );
    
    this.initializeCharts();
  }
  /*
  export interface Sale... {
    {
        "id": 1,
        "payMethod": "Debit",
        "idUser": 16,
        "idBook": 1,
        "total": 123,
        "date": "2024-07-21"
    },
  }
  */
  initializeCharts(): void {
    this.createBooksByCategoryChart();

    this.createSalesRecordChart();
        //ya tengo un metodo para acceder a todos los sales
    /*
  getAllSales():Observable<any>{
    return this.http.get(this.baseurl+'/sales/', 
    {headers: this.httpHeaders});
  }
    */

    this.createTopBuyersChart();
  }


  createBooksByCategoryChart(): void {
    this.api.getAllBooks().subscribe(
      (books: any[]) => {
        const categories = ['N/A', 'Suspenso', 'Romance', 'Ciencia Ficción', 'Aventura', 'Fantasía', 'Acción'];
        const categoryCounts = this.countBooksByCategory(books, categories);

        const ctx = document.getElementById('booksByCategoryChart') as ChartItem;
        this.booksByCategoryChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: categories,
            datasets: [{
              data: categoryCounts,
              backgroundColor: [
                '#FF6345', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384'
              ]
            }]
          }
        });
      },
      error => console.error('Error fetching books', error)
    );
  }

  countBooksByCategory(books: any[], categories: string[]): number[] {
    const counts = categories.map(category => books.filter(book => book.cathegory === category).length);
    return counts;
  }

  
  createSalesRecordChart(): void {
    this.api.getAllSales().subscribe(
      (sales: any[]) => {
        const salesByMonth = this.countSalesByMonth(sales);

        const ctx = document.getElementById('salesRecordChart') as ChartItem;
        this.salesRecordChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: Object.keys(salesByMonth),
            datasets: [{
              label: 'Ventas',
              data: Object.values(salesByMonth),
              borderColor: '#36A2EB',
              fill: false
            }]
          }
        });
      },
      error => console.error('Error fetching sales', error)
    );
  }

  countSalesByMonth(sales: any[]): { [key: string]: number } {
    const salesByMonth: { [key: string]: number } = {};

    sales.forEach(sale => {
      const date = new Date(sale.date);
      const month = date.toLocaleString('default', { month: 'long' });

      if (!salesByMonth[month]) {
        salesByMonth[month] = 0;
      }
      salesByMonth[month]++;
    });

    return salesByMonth;
  }


  createTopBuyersChart(): void {
    this.api.getAllSales().subscribe(
      (sales: any[]) => {
        const buyerSalesCount = this.countSalesByBuyer(sales);

        //Obtener solo los 3 primeros compradores!
        const topBuyers = Object.keys(buyerSalesCount)
          .sort((a, b) => buyerSalesCount[b] - buyerSalesCount[a])
          .slice(0, 3);

        const topBuyerNames: string[] = [];
        const topBuyerSales: number[] = [];

        topBuyers.forEach(buyerId => {
          this.api.getUserById(+buyerId).subscribe(
            (user: any) => {
              topBuyerNames.push(user.username);
              topBuyerSales.push(buyerSalesCount[buyerId]);

              if (topBuyerNames.length === topBuyers.length) {
                const ctx = document.getElementById('topBuyersChart') as ChartItem;
                this.topBuyersChart = new Chart(ctx, {
                  type: 'bar',
                  data: {
                    labels: topBuyerNames,
                    datasets: [{
                      label: 'Mayores compradores',
                      data: topBuyerSales,
                      backgroundColor: '#FF6384'
                    }]
                  }
                });
              }
            },
            error => console.error('Error fetching user', error)
          );
        });
      },
      error => console.error('Error fetching sales', error)
    );
  }

  countSalesByBuyer(sales: any[]): { [key: string]: number } {
    const salesByBuyer: { [key: string]: number } = {};

    sales.forEach(sale => {
      const buyerId = sale.idUser.toString();
      if (!salesByBuyer[buyerId]) {
        salesByBuyer[buyerId] = 0;
      }
      salesByBuyer[buyerId]++;
    });

    return salesByBuyer;
  }
}
