import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBusquedaComponent } from './detalle-busqueda.component';

describe('DetalleBusquedaComponent', () => {
  let component: DetalleBusquedaComponent;
  let fixture: ComponentFixture<DetalleBusquedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleBusquedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
