import { Component, OnInit, Input } from '@angular/core';
import { ISuperDataSourceService } from '../../core/SuperDataSourceService';
import { SuperTableOptions } from '../../core/SuperTableOptions';
import { Required } from '../../core/Decorators';
import { SuperDataSource } from '../../core/SuperDataSource';

export interface ISuperDataTableColumn {
  name: string;
  displayProperty: string;
  styles?: { [key: string]: string };
}

@Component({
  selector: 'super-table',
  templateUrl: './super-table.component.html',
  styleUrls: ['./super-table.component.scss']
})
export class SuperTableComponent<T, TContext = any> implements OnInit {
  @Input()
  columns: ISuperDataTableColumn[];

  @Input()
  @Required
  options: SuperTableOptions<T, TContext>;

  dataSource: SuperDataSource<T, TContext>;
  constructor() {}

  ngOnInit() {
    this.dataSource = new SuperDataSource(this.options);
  }
}
