import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { 
  DashboardFilters, 
  DashboardData, 
  FaturasStatus, 
  EvolucaoMensal,
  ApiResponse 
} from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService: ApiService) {}

  getDashboardData(filters?: DashboardFilters): Observable<ApiResponse<DashboardData>> {
    const params: any = {};
    
    if (filters?.periodo) {
      params.periodo = filters.periodo;
    }
    if (filters?.operadoraId) {
      params.operadoraId = filters.operadoraId;
    }
    if (filters?.status !== undefined) {
      params.status = filters.status;
    }

    return this.apiService.getFullResponse<DashboardData>('/dashboard', params);
  }
} 