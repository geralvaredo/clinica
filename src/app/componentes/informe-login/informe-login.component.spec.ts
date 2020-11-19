import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeLoginComponent } from './informe-login.component';

describe('InformeLoginComponent', () => {
  let component: InformeLoginComponent;
  let fixture: ComponentFixture<InformeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
