import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperTableRoutingModule } from './super-table-routing.module';
import { SuperTableComponent } from './components/super-table/super-table.component';
import { SuperTableExampleComponent } from './components/super-table-example/super-table-example.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatTableModule,
  MatPaginatorModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  declarations: [SuperTableComponent, SuperTableExampleComponent],
  imports: [
    CommonModule,
    SuperTableRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule
  ]
})
export class SuperTableModule {}
