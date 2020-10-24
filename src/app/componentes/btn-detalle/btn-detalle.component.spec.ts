import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDetalleComponent } from './btn-detalle.component';

describe('BtnDetalleComponent', () => {
  let component: BtnDetalleComponent;
  let fixture: ComponentFixture<BtnDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
