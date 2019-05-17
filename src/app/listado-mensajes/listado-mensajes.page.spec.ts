import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMensajesPage } from './listado-mensajes.page';

describe('ListadoMensajesPage', () => {
  let component: ListadoMensajesPage;
  let fixture: ComponentFixture<ListadoMensajesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoMensajesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMensajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
