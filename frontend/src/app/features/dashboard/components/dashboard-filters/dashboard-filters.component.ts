import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { DashboardFilters } from '../../../../shared/models';
import { OperadoraService } from '../../../../core/services/operadora.service';
import { EFaturaStatus, getFaturaStatusOptions } from '../../../../shared/models/fatura.model';
import { Operadora } from '../../../../shared/models/operadora.model';

@Component({
  selector: 'app-dashboard-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-filters.component.html',
  styleUrls: ['./dashboard-filters.component.scss']
})
export class DashboardFiltersComponent implements OnInit {
  filterForm: FormGroup;
  @Output() filtersChanged = new EventEmitter<DashboardFilters>();

  operadoras: Operadora[] = [];
  statusOptions = getFaturaStatusOptions();

  constructor(
    private fb: FormBuilder,
    private operadoraService: OperadoraService
  ) {
    this.filterForm = this.fb.group({
      periodo: ['365'],
      operadoraId: [''],
      status: ['']
    });

    this.filterForm.valueChanges.subscribe(values => {
      const filters: DashboardFilters = {
        periodo: parseInt(values.periodo),
        operadoraId: values.operadoraId || undefined,
        status: values.status ? parseInt(values.status) : undefined
      };
      this.filtersChanged.emit(filters);
    });
  }

  ngOnInit() {
    this.loadOperadoras();
  }

  private loadOperadoras() {
    this.operadoraService.getAll().subscribe(result => {
      this.operadoras = result.items;
    });
  }
} 