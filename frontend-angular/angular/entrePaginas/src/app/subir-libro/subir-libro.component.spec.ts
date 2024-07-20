import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirLibroComponent } from './subir-libro.component';

describe('SubirLibroComponent', () => {
  let component: SubirLibroComponent;
  let fixture: ComponentFixture<SubirLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubirLibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
