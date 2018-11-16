import { Component, OnInit } from '@angular/core';
import { ISuperDataTableColumn } from '../super-table/super-table.component';
import { SuperTableOptions } from '../../core/SuperTableOptions';
import { MockDataService } from '../../services/mock-data.service';
import { MockModel } from '../../models/MockModel';
import { MockModelContext } from '../../models/MockModelContext';

@Component({
  selector: 'super-table-example',
  templateUrl: './super-table-example.component.html',
  styleUrls: ['./super-table-example.component.scss'],
  providers: [MockDataService]
})
export class SuperTableExampleComponent implements OnInit {
  columns: ISuperDataTableColumn[];
  tableOptions: SuperTableOptions<MockModel, MockModelContext>;

  constructor(public service: MockDataService) {
    this.columns = [
      { displayProperty: 'name', name: 'name' },
      { displayProperty: 'description', name: 'description' },
      { displayProperty: 'description', name: 'asd' },
      { displayProperty: 'description', name: 'description4' }
    ];

    this.tableOptions = { dataService: service, keyProperty: 'id' };
  }

  ngOnInit() {}
}
