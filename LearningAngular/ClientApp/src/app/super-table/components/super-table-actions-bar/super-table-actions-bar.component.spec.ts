import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperTableActionsBarComponent } from './super-table-actions-bar.component';

describe('SuperTableActionsBarComponent', () => {
  let component: SuperTableActionsBarComponent;
  let fixture: ComponentFixture<SuperTableActionsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperTableActionsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperTableActionsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
