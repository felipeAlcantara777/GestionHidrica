import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  pulsos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  tiempo = [1.00, 0.60, 0.70, 0.50, 1.00, 0.40, 1.00, 1.00, 0.20, 0.50, 0.20, 0.70, 0.80, 1.00, 1.00, 1.00, 1.00, 0.60, 0.80, 0.90, 1.00, 1.00, 1.00, 0.30, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00];
  volumen = [0.5, 0.4, 0.5, 0.4, 0.5, 0.5, 0.5, 0.5, 0.6, 0.7, 0.6, 0.6, 0.6, 0.4, 0.3, 0.2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.3, 0.3, 0.2, 0.2, 0.1, 0.0];
  q = [0.50, 0.67, 0.71, 0.80, 0.50, 1.25, 0.50, 0.50, 3.00, 1.40, 3.00, 0.86, 0.75, 0.40, 0.30, 0.20, 0.50, 0.83, 0.63, 0.56, 0.50, 0.40, 0.40, 1.33, 0.30, 0.30, 0.20, 0.20, 0.10, 0.00];
  humedad = [25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  temperatura = [14, 13, 16, 12, 13, 12.7, 12.4, 12.1, 11.8, 11.5, 11.2, 10.9, 10.6, 10.3, 10, 9.7, 9.4, 9.1, 8.8, 8.5, 8.2, 7.9, 7.6, 7.3, 7, 6.7, 6.4, 6.1, 5.8, 5.5];

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createBarChart();
    this.createPieChart();
  }

  createBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.pulsos.map(p => `Pulso ${p}`),
        datasets: [
          {
            label: 'Tiempo (s)',
            data: this.tiempo,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Volumen (l)',
            data: this.volumen,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Q',
            data: this.q,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Humedad',
            data: this.humedad,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          },
          {
            label: 'Temperatura',
            data: this.temperatura,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createPieChart() {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Tiempo (s)', 'Volumen (l)', 'Q', 'Humedad', 'Temperatura'],
        datasets: [
          {
            label: 'Datos',
            data: [
              this.tiempo.reduce((a, b) => a + b, 0),
              this.volumen.reduce((a, b) => a + b, 0),
              this.q.reduce((a, b) => a + b, 0),
              this.humedad.reduce((a, b) => a + b, 0),
              this.temperatura.reduce((a, b) => a + b, 0)
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Distribución de Datos'
          }
        }
      }
    });
  }
}
