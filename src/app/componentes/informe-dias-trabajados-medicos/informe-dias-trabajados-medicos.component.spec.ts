import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeDiasTrabajadosMedicosComponent } from './informe-dias-trabajados-medicos.component';

describe('InformeDiasTrabajadosMedicosComponent', () => {
  let component: InformeDiasTrabajadosMedicosComponent;
  let fixture: ComponentFixture<InformeDiasTrabajadosMedicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeDiasTrabajadosMedicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeDiasTrabajadosMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
