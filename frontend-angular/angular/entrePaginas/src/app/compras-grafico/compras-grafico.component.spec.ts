import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasGraficoComponent } from './compras-grafico.component';

describe('ComprasGraficoComponent', () => {
  let component: ComprasGraficoComponent;
  let fixture: ComponentFixture<ComprasGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComprasGraficoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
