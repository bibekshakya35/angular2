import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaesPortfolioComponent } from './plaes-portfolio.component';

describe('PlaesPortfolioComponent', () => {
  let component: PlaesPortfolioComponent;
  let fixture: ComponentFixture<PlaesPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaesPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaesPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
