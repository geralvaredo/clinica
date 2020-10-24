import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnModificarComponent } from './btn-modificar.component';

describe('BtnModificarComponent', () => {
  let component: BtnModificarComponent;
  let fixture: ComponentFixture<BtnModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
