import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

interface HealthCheck {
  status: string;
  timestamp: string;
  version?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  constructor(private apiService: ApiService) {}

  /**
   * Verifica se a API está funcionando
   */
  checkHealth(): Observable<HealthCheck> {
    return this.apiService.get<HealthCheck>('/health');
  }

  /**
   * Testa a conectividade básica com a API
   */
  ping(): Observable<any> {
    return this.apiService.get<any>('/ping');
  }
} 