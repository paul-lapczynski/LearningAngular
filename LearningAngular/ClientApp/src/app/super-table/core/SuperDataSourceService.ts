import { Observable } from 'rxjs/observable';

export interface ISuperDataSourceService<T, TContext> {
  getData(
    filterString: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    context?: TContext
  ): Observable<T[]>;
}
