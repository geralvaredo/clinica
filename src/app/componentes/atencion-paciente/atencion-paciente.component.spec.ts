import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionPacienteComponent } from './atencion-paciente.component';

describe('AtencionPacienteComponent', () => {
  let component: AtencionPacienteComponent;
  let fixture: ComponentFixture<AtencionPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
