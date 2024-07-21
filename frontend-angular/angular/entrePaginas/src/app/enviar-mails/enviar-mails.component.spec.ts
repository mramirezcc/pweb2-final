import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarMailsComponent } from './enviar-mails.component';

describe('EnviarMailsComponent', () => {
  let component: EnviarMailsComponent;
  let fixture: ComponentFixture<EnviarMailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnviarMailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
