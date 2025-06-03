import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    CardComponent,
    ConfirmDialogComponent
  ],
  exports: [
    CardComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { } 