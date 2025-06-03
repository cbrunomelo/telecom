import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaturasListComponent } from './pages/faturas-list/faturas-list.component';
import { FaturaFormComponent } from './fatura-form/fatura-form.component';

const routes: Routes = [
  { path: '', component: FaturasListComponent },
  { path: 'novo', component: FaturaFormComponent },
  { path: 'editar/:id', component: FaturaFormComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class FaturasModule { } 