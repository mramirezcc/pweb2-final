import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioMainComponent } from './usuario-main.component';

describe('UsuarioMainComponent', () => {
  let component: UsuarioMainComponent;
  let fixture: ComponentFixture<UsuarioMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
