import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCalculadorasPage } from './listado-calculadoras.page';

describe('ListadoCalculadorasPage', () => {
  let component: ListadoCalculadorasPage;
  let fixture: ComponentFixture<ListadoCalculadorasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoCalculadorasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCalculadorasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
