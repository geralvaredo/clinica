import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeTurnosPorMedicosComponent } from './informe-turnos-por-medicos.component';

describe('InformeTurnosPorMedicosComponent', () => {
  let component: InformeTurnosPorMedicosComponent;
  let fixture: ComponentFixture<InformeTurnosPorMedicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeTurnosPorMedicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeTurnosPorMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
