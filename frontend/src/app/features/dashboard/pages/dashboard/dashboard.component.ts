import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { CardComponent } from '@shared/components/card/card.component';
import { DashboardChartComponent } from '../../components/dashboard-chart/dashboard-chart.component';
import { DashboardFiltersComponent } from '../../components/dashboard-filters/dashboard-filters.component';
import { FaturaService, DashboardFilters } from '../../../../core/services/fatura.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    DashboardChartComponent,
    DashboardFiltersComponent
  ],
  templateUrl: './dashboard.component.html',
  styles: [`
    .dashboard-container {
      padding: 2rem;
    }

    .dashboard-header {
      margin-bottom: 2rem;

      h2 {
        color: #333;
        margin-bottom: 1.5rem;
      }
    }

    :host {
      display: block;
      background-color: #f8f9fa;
      min-height: 100vh;
    }
  `]
})
export class DashboardComponent implements OnInit {
  dashboardData: any;
  currentFilters: DashboardFilters = {
    periodo: 365,
    operadoraId: undefined,
    status: undefined
  };

  // Configurações do gráfico de pizza
  pieChartType: ChartType = 'pie';
  pieChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };
  pieChartOptions: ChartConfiguration['options'] = {};

  // Configurações do gráfico de barras
  barChartType: ChartType = 'bar';
  barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            if (label.includes('Valor')) {
              return `${label}: R$ ${value.toLocaleString('pt-BR')}`;
            }
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        ticks: {
          callback: (value: any) => {
            return 'R$ ' + value.toLocaleString('pt-BR');
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  constructor(private faturaService: FaturaService) {}

  ngOnInit() {
    this.loadDashboardData();
    this.setupChartConfigs();
  }

  loadDashboardData() {
    this.faturaService.getDashboardData(this.currentFilters).subscribe((data: any) => {
      this.dashboardData = data;
      this.updateCharts();
    });
  }

  setupChartConfigs() {
    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              return `${label}: ${value} faturas`;
            }
          }
        }
      }
    };
  }

  updateCharts() {
    if (this.dashboardData) {
      this.pieChartData = {
        labels: ['Pagas', 'Pendentes', 'Atrasadas'],
        datasets: [{
          data: [
            this.dashboardData.faturasStatus.pagas,
            this.dashboardData.faturasStatus.pendentes,
            this.dashboardData.faturasStatus.atrasadas
          ],
          backgroundColor: ['#28a745', '#ffc107', '#dc3545']
        }]
      };

      this.barChartData = {
        labels: this.dashboardData.evolucaoMensal.map((item: any) => item.mes),
        datasets: [
          {
            label: 'Valor Total',
            data: this.dashboardData.evolucaoMensal.map((item: any) => item.valor),
            backgroundColor: '#007bff',
            type: 'line',
            yAxisID: 'y'
          },
          {
            label: 'Faturas Emitidas',
            data: this.dashboardData.evolucaoMensal.map((item: any) => item.emitidas),
            backgroundColor: '#6c757d',
            type: 'bar',
            yAxisID: 'y1'
          },
          {
            label: 'Faturas Pagas',
            data: this.dashboardData.evolucaoMensal.map((item: any) => item.pagas),
            backgroundColor: '#28a745',
            type: 'bar',
            yAxisID: 'y1'
          }
        ]
      };
    }
  }

  onFiltersChanged(filters: DashboardFilters) {
    this.currentFilters = { ...this.currentFilters, ...filters };
    this.loadDashboardData();
  }
} 