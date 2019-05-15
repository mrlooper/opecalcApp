import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraSAS1617ESTBPage } from './calculadora-sas1617-estb.page';

describe('CalculadoraSAS1617ESTBPage', () => {
  let component: CalculadoraSAS1617ESTBPage;
  let fixture: ComponentFixture<CalculadoraSAS1617ESTBPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculadoraSAS1617ESTBPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadoraSAS1617ESTBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
