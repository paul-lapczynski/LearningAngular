import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RjxFunComponent } from './rjx-fun.component';

describe('RjxFunComponent', () => {
  let component: RjxFunComponent;
  let fixture: ComponentFixture<RjxFunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RjxFunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RjxFunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
