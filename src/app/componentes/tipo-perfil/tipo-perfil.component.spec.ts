import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPerfilComponent } from './tipo-perfil.component';

describe('TipoPerfilComponent', () => {
  let component: TipoPerfilComponent;
  let fixture: ComponentFixture<TipoPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
