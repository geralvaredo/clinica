import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionEspecialidadComponent } from './verificacion-especialidad.component';

describe('VerificacionEspecialidadComponent', () => {
  let component: VerificacionEspecialidadComponent;
  let fixture: ComponentFixture<VerificacionEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
