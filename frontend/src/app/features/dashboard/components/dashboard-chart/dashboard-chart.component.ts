import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss']
})
export class DashboardChartComponent implements OnInit {
  @Input() title: string = '';
  @Input() chartType: ChartType = 'bar';
  @Input() chartData: ChartConfiguration['data'] = { datasets: [] };
  @Input() chartOptions: ChartConfiguration['options'] = {};

  ngOnInit() {
    const defaults = Chart.defaults;
    if (defaults.font) {
      defaults.font.family = "'Inter', sans-serif";
      defaults.font.size = 12;
    }
    defaults.color = '#666';
  }
} 