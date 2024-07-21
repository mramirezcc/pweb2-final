import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorLoginComponent } from './vendedor-login.component';

describe('VendedorLoginComponent', () => {
  let component: VendedorLoginComponent;
  let fixture: ComponentFixture<VendedorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendedorLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
