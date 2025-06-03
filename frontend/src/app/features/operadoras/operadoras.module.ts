import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OperadorasListComponent } from './pages/operadoras-list/operadoras-list.component';
import { OperadoraFormComponent } from './operadora-form/operadora-form.component';

const routes: Routes = [
  { path: '', component: OperadorasListComponent },
  { path: 'novo', component: OperadoraFormComponent },
  { path: 'editar/:id', component: OperadoraFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OperadorasModule { } 