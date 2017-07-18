import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavCategoryComponent } from './fav-category.component';

describe('FavCategoryComponent', () => {
  let component: FavCategoryComponent;
  let fixture: ComponentFixture<FavCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
