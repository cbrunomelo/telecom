import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratosListComponent } from './pages/contratos-list/contratos-list.component';
import { ContratoFormComponent } from './contrato-form/contrato-form.component';

const routes: Routes = [
  { path: '', component: ContratosListComponent },
  { path: 'novo', component: ContratoFormComponent },
  { path: 'editar/:id', component: ContratoFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ContratosModule { } 