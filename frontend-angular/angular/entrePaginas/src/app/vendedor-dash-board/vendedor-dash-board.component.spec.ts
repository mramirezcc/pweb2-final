import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorDashBoardComponent } from './vendedor-dash-board.component';

describe('VendedorDashBoardComponent', () => {
  let component: VendedorDashBoardComponent;
  let fixture: ComponentFixture<VendedorDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendedorDashBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
