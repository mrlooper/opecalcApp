import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTiposAccesoPage } from './listado-tipos-acceso.page';

describe('ListadoTiposAccesoPage', () => {
  let component: ListadoTiposAccesoPage;
  let fixture: ComponentFixture<ListadoTiposAccesoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoTiposAccesoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTiposAccesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
