import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeBookComponent } from './exchange-book.component';

describe('ExchangeBookComponent', () => {
  let component: ExchangeBookComponent;
  let fixture: ComponentFixture<ExchangeBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
