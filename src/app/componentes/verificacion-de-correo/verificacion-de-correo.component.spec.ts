import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionDeCorreoComponent } from './verificacion-de-correo.component';

describe('VerificacionDeCorreoComponent', () => {
  let component: VerificacionDeCorreoComponent;
  let fixture: ComponentFixture<VerificacionDeCorreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionDeCorreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionDeCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
