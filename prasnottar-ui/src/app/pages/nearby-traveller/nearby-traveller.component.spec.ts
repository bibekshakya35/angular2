import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyTravellerComponent } from './nearby-traveller.component';

describe('NearbyTravellerComponent', () => {
  let component: NearbyTravellerComponent;
  let fixture: ComponentFixture<NearbyTravellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyTravellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyTravellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
