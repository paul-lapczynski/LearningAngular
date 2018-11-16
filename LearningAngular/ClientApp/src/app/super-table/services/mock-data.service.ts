import { Injectable } from '@angular/core';
import { ISuperDataSourceService } from '../core/SuperDataSourceService';
import { MockModel } from '../models/MockModel';
import { MockModelContext } from '../models/MockModelContext';
import { Observable, of } from 'rxjs';
import { filter, map, mergeAll, take, skip } from 'rxjs/operators';
import { SuperTableResult } from '../core/SuperTableResult';

@Injectable({
  providedIn: 'root'
})
export class MockDataService
  implements ISuperDataSourceService<MockModel, MockModelContext> {
  constructor() {
    for (let i = 0; i < 10000; i++) {
      this.data.push({
        tenantId: [1, 2, 3][Math.floor(Math.random() * 3)].toString(),
        id: String(i),
        description: 'Description for ' + i,
        name: i + 'Robot'
      });
    }
  }

  data: MockModel[] = [];
  getData(
    filterString: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    context?: MockModelContext
  ): Observable<SuperTableResult<MockModel>> {
    return of(this.data).pipe(
      map(items => items.filter(item => item.name.indexOf(filterString) >= 0)),
      map(items =>
        items.sort((a, b) =>
          sortDirection === 'desc'
            ? Number(a.id) - Number(b.id)
            : Number(b.id) - Number(a.id)
        )
      ),
      map(items => {
        return {
          total: items.length,
          data: items.slice(
            pageIndex * pageSize,
            pageIndex * pageSize + pageSize
          )
        };
      })
    );
  }
}
