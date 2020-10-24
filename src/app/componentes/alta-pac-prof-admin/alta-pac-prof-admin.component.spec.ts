import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPacProfAdminComponent } from './alta-pac-prof-admin.component';

describe('AltaPacProfAdminComponent', () => {
  let component: AltaPacProfAdminComponent;
  let fixture: ComponentFixture<AltaPacProfAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaPacProfAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaPacProfAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
