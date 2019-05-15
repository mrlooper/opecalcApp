import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPlantillaPage } from './ver-plantilla.page';

describe('VerPlantillaPage', () => {
  let component: VerPlantillaPage;
  let fixture: ComponentFixture<VerPlantillaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPlantillaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPlantillaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
