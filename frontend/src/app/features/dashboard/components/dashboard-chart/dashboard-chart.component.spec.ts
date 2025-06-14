import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardChartComponent } from './dashboard-chart.component';
import { NgChartsModule } from 'ng2-charts';

describe('DashboardChartComponent', () => {
  let component: DashboardChartComponent;
  let fixture: ComponentFixture<DashboardChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardChartComponent, NgChartsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 