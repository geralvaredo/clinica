import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnBorrarComponent } from './btn-borrar.component';

describe('BtnBorrarComponent', () => {
  let component: BtnBorrarComponent;
  let fixture: ComponentFixture<BtnBorrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnBorrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
