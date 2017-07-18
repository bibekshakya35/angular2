import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodShowComponent } from './blood-show.component';

describe('BloodShowComponent', () => {
  let component: BloodShowComponent;
  let fixture: ComponentFixture<BloodShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
