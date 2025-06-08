import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { CardComponent } from '@shared/components/card/card.component';
import { DashboardChartComponent } from '../../components/dashboard-chart/dashboard-chart.component';
import { DashboardFiltersComponent } from '../../components/dashboard-filters/dashboard-filters.component';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { DashboardFilters, DashboardData, ApiResponse } from '../../../../shared/models';

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
  dashboardData: DashboardData | null = null;
  currentFilters: DashboardFilters = {
    periodo: 365,
    operadoraId: undefined,
    status: undefined
  };

  pieChartType: ChartType = 'pie';
  pieChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };
  pieChartOptions: ChartConfiguration['options'] = {};

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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
    this.setupChartConfigs();
  }

  loadDashboardData() {
    this.dashboardService.getDashboardData(this.currentFilters).subscribe({
      next: (response: ApiResponse<DashboardData>) => {
        if (response.sucess && response.data) {
          this.dashboardData = response.data;
        } else {
          this.dashboardData = {
            totalFaturas: 0,
            valorTotalFaturado: 0,
            faturasStatus: { pagas: 0, pendentes: 0, atrasadas: 0 },
            evolucaoMensal: []
          };
        }
        this.updateCharts();
      },
      error: (error) => {
        this.dashboardData = {
          totalFaturas: 0,
          valorTotalFaturado: 0,
          faturasStatus: { pagas: 0, pendentes: 0, atrasadas: 0 },
          evolucaoMensal: []
        };
        this.updateCharts();
      }
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