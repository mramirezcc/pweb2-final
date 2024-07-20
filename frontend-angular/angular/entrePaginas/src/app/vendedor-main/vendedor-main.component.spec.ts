import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorMainComponent } from './vendedor-main.component';

describe('VendedorMainComponent', () => {
  let component: VendedorMainComponent;
  let fixture: ComponentFixture<VendedorMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendedorMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
