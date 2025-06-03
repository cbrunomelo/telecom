import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contratos',
    loadChildren: () => import('@features/contratos/contratos.module').then(m => m.ContratosModule)
  },
  {
    path: 'faturas',
    loadChildren: () => import('@features/faturas/faturas.module').then(m => m.FaturasModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'operadoras',
    loadChildren: () => import('./features/operadoras/operadoras.module').then(m => m.OperadorasModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 