/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BloodDonarComponent } from './blood-donar.component';

describe('BloodDonarComponent', () => {
  let component: BloodDonarComponent;
  let fixture: ComponentFixture<BloodDonarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodDonarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodDonarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
