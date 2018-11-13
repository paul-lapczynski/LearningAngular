import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  interval,
  merge,
  Observable,
  of,
  fromEvent,
  timer,
  concat,
  BehaviorSubject
} from 'rxjs';
import { tap } from 'rxjs/operators/tap';
import { scan } from 'rxjs/operators/scan';
import {
  map,
  switchMap,
  filter,
  debounceTime,
  takeUntil,
  mergeAll,
  mergeScan,
  mergeMap,
  flatMap,
  throttleTime,
  withLatestFrom
} from 'rxjs/operators';
import { MatSelect, MatSelectTrigger } from '@angular/material';

@Component({
  selector: 'rjx-fun',
  templateUrl: './rjx-fun.component.html',
  styleUrls: ['./rjx-fun.component.scss']
})
export class RjxFunComponent implements OnInit, AfterViewInit {
  items$ = new BehaviorSubject<any[]>([]);
  items = this.items$.asObservable().pipe(
    scan((acc, value) => {
      return acc ? [...acc, ...value] : [];
    })
  );
  serverItems = [];
  iterations = 0;
  @ViewChild('select', { read: MatSelectTrigger })
  select: MatSelect;

  fakeHttp: Observable<any[]>;

  constructor() {}

  ngOnInit() {
    this.fakeHttp = new Observable<any[]>(observer => {
      this.serverItems = [1, 2, 3, 4, 5];
      this.serverItems = this.serverItems.map(
        item => item + this.iterations * 5
      );
      this.iterations++;

      observer.next(this.serverItems);
      observer.complete();
    });

    interval(50)
      .pipe(
        takeUntil(timer(200)),
        switchMap(() => this.fakeHttp),
        tap(next => this.items$.next(next))
      )
      .subscribe();

    // this.items = merge(init).pipe(
    //   scan((acc, value) => {
    //     return acc ? [...acc, ...value] : [];
    //   })
    // );
  }
  ngAfterViewInit() {}

  selectOpen(opened: any, select: MatSelect) {
    if (select.panel) {
      fromEvent(select.panel.nativeElement, 'scroll')
        .pipe(
          filter((event: any) => {
            return (
              event.srcElement.scrollHeight -
                event.srcElement.scrollTop -
                event.srcElement.clientHeight <
              300
            );
          }),
          debounceTime(50),
          switchMap(() => this.fakeHttp),
          tap(next => {
            return this.items$.next(next);
          })
        )
        .subscribe();
    }
  }
}
