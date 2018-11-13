import { Component, OnInit } from '@angular/core';
import { ISuperDataTableColumn } from '../super-table/super-table.component';
import { SuperTableOptions } from '../../core/SuperTableOptions';

@Component({
  selector: 'super-table-example',
  templateUrl: './super-table-example.component.html',
  styleUrls: ['./super-table-example.component.scss']
})
export class SuperTableExampleComponent implements OnInit {
  columns: ISuperDataTableColumn[];
  tableOptions: SuperTableOptions<string>;

  constructor() {
    this.columns = [
      { displayProperty: 'displayOne', name: 'one' },
      { displayProperty: 'displayTwo', name: 'two' }
    ];
  }

  ngOnInit() {}
}
