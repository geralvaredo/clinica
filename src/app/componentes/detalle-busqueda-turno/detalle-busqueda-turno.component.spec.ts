import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBusquedaTurnoComponent } from './detalle-busqueda-turno.component';

describe('DetalleBusquedaTurnoComponent', () => {
  let component: DetalleBusquedaTurnoComponent;
  let fixture: ComponentFixture<DetalleBusquedaTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleBusquedaTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBusquedaTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
