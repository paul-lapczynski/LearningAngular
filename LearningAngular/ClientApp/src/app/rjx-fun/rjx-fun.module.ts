import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RjxFunComponent } from './components/rjx-fun/rjx-fun.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [RjxFunComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'rxjs', component: RjxFunComponent, pathMatch: 'full' }
    ]),
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class RjxFunModule {}
