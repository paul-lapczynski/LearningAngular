import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, scan, catchError, finalize } from 'rxjs/operators';
import { SuperDataSourceOptions } from './SuperDataSourceOptions';
import { SuperTableResult } from './SuperTableResult';

export class SuperDataSource<T, TContext = any> implements DataSource<T> {
  private dataSubject = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  public total$ = this.totalSubject.asObservable();

  private dataCacheSubject = new BehaviorSubject<SuperDataSourceCache<T>[]>([]);
  private dataCache$ = this.dataCacheSubject.asObservable().pipe(
    scan((acc, value) => {
      if (value[0].marked) {
        return [...acc, value[0]];
      } else {
        return acc.filter(
          entity =>
            entity[this.options.keyProperty] !==
            value[0][this.options.keyProperty]
        );
      }
    })
  );
  private options: SuperDataSourceOptions<T, TContext>;

  constructor(options: SuperDataSourceOptions<T, TContext>) {
    this.options = options
      ? options
      : new SuperDataSourceOptions<T, TContext>();
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.dataCacheSubject.complete();
    this.loadingSubject.complete();
  }

  loadData(
    filterString: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    context?: TContext
  ) {
    if (this.options.dataService) {
      this.options.dataService
        .getData(filterString, sortDirection, pageIndex, pageSize, context)
        .pipe(
          catchError(() => of(new SuperTableResult<T>())),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(result => {
          this.totalSubject.next(result.total);
          this.dataSubject.next(result.data || []);
        });
    }
  }

  mark(entity: T) {
    this.dataCacheSubject.next([{ entity: entity, marked: true }]);
  }

  unMark(entity: T) {
    this.dataCacheSubject.next([{ entity: entity, marked: false }]);
  }
}

class SuperDataSourceCache<T> {
  marked: boolean;
  entity: T;
}
