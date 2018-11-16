import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { ISuperDataSourceService } from '../../core/SuperDataSourceService';
import { SuperTableOptions } from '../../core/SuperTableOptions';
import { SuperDataSource } from '../../core/SuperDataSource';
import { Observable, BehaviorSubject, fromEvent, pipe } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import {
  map,
  tap,
  debounceTime,
  filter,
  throttleTime,
  switchMap
} from 'rxjs/operators';
import { MatPaginator, MatTab, MatTable } from '@angular/material';
import { FormControl } from '@angular/forms';

export interface ISuperDataTableColumn {
  name: string;
  displayProperty: string;
  styles?: { [key: string]: string };
  sortable?: boolean;
}

export type SuperTableDataRetreivalStrategy = 'all' | 'pages' | 'dynamic';

@Component({
  selector: 'super-table',
  templateUrl: './super-table.component.html',
  styleUrls: ['./super-table.component.scss']
})
export class SuperTableComponent<T, TContext = any>
  implements OnInit, AfterViewInit {
  @Input()
  columns: ISuperDataTableColumn[];

  @Input()
  options: SuperTableOptions<T, TContext>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('matTable', { read: ElementRef })
  tableRef: ElementRef;

  dataSource: SuperDataSource<T, TContext>;
  selection = new SelectionModel<T>(true, []);

  _columnDefsSubject = new BehaviorSubject<string[]>([]);
  _columnDef$ = this._columnDefsSubject
    .asObservable()
    .pipe(map(items => ['select', ...items]));

  filter = new FormControl('');

  constructor() {}

  loadData(
    searchString = '',
    sortDirection = 'asc',
    pageIndex?: number,
    pageSize?: number
  ) {
    this.dataSource.loadData(
      searchString,
      sortDirection,
      pageIndex || this.paginator.pageIndex,
      pageSize || this.paginator.pageSize
    );
  }

  ngOnInit() {
    this._columnDefsSubject.next(this.columns.map(column => column.name));
    this.dataSource = new SuperDataSource(this.options);
    this.paginator.page.pipe(tap(() => this.loadData())).subscribe();
    this.dataSource.loadData('', 'asc', 0, 10);

    this.filter.valueChanges.pipe(debounceTime(200)).subscribe(text => {
      (this.tableRef.nativeElement as any).scrollTop = 0;
      this.paginator.pageSize = 0;
      this.loadData(
        text || '',
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize
      );
    });
  }

  ngAfterViewInit() {
    fromEvent<Event>(this.tableRef.nativeElement, 'scroll')
      .pipe(
        debounceTime(50),
        throttleTime(5),
        filter(
          value =>
            value.srcElement.scrollTop + value.srcElement.clientHeight >=
            value.srcElement.scrollHeight - 200
        ),
        tap(item => {
          this.paginator.pageSize += 10;
          console.log(this.paginator.pageSize);
          this.loadData(
            this.filter.value || '',
            'asc',
            0,
            this.paginator.pageSize
          );
        })
      )
      .subscribe();
  }

  rowClick(row: T) {
    console.log(this.selection.selected);
    console.log(row);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = 10;
    return numSelected === numRows;
  }

  masterToggle() {
    this.selection.clear();
  }
}
