import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSearchComponent } from './blood-search.component';

describe('BloodSearchComponent', () => {
  let component: BloodSearchComponent;
  let fixture: ComponentFixture<BloodSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
