import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorNavbarComponent } from './vendedor-navbar.component';

describe('VendedorNavbarComponent', () => {
  let component: VendedorNavbarComponent;
  let fixture: ComponentFixture<VendedorNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendedorNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
