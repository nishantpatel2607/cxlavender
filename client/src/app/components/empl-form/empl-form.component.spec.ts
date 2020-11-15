import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplFormComponent } from './empl-form.component';

describe('EmplFormComponent', () => {
  let component: EmplFormComponent;
  let fixture: ComponentFixture<EmplFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmplFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
