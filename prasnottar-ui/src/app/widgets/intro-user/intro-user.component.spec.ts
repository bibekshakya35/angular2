import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroUserComponent } from './intro-user.component';

describe('IntroUserComponent', () => {
  let component: IntroUserComponent;
  let fixture: ComponentFixture<IntroUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
