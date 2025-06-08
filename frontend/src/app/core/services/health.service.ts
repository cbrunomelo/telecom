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

  checkHealth(): Observable<HealthCheck> {
    return this.apiService.get<HealthCheck>('/health');
  }

  ping(): Observable<any> {
    return this.apiService.get<any>('/ping');
  }
} 