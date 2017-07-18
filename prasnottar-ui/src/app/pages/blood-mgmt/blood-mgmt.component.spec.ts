import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodMgmtComponent } from './blood-mgmt.component';

describe('BloodMgmtComponent', () => {
  let component: BloodMgmtComponent;
  let fixture: ComponentFixture<BloodMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
