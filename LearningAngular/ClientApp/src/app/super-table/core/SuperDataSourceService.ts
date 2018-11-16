import { Observable } from 'rxjs/observable';
import { SuperTableResult } from './SuperTableResult';

export interface ISuperDataSourceService<T, TContext> {
  getData(
    filterString: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    context?: TContext
  ): Observable<SuperTableResult<T>>;
}
