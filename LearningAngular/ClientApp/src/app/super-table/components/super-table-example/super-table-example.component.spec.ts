import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperTableExampleComponent } from './super-table-example.component';

describe('SuperTableExampleComponent', () => {
  let component: SuperTableExampleComponent;
  let fixture: ComponentFixture<SuperTableExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperTableExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperTableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
