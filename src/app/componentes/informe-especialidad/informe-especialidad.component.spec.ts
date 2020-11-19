import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeEspecialidadComponent } from './informe-especialidad.component';

describe('InformeEspecialidadComponent', () => {
  let component: InformeEspecialidadComponent;
  let fixture: ComponentFixture<InformeEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
