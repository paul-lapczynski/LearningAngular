import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperTableRoutingModule } from './super-table-routing.module';
import { SuperTableComponent } from './components/super-table/super-table.component';
import { SuperTableExampleComponent } from './components/super-table-example/super-table-example.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { SuperTableActionsBarComponent } from './components/super-table-actions-bar/super-table-actions-bar.component';

@NgModule({
  declarations: [
    SuperTableComponent,
    SuperTableExampleComponent,
    SuperTableActionsBarComponent
  ],
  imports: [
    CommonModule,
    SuperTableRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SuperTableModule {}
