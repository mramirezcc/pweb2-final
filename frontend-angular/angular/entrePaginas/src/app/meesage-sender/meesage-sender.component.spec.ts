import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeesageSenderComponent } from './meesage-sender.component';

describe('MeesageSenderComponent', () => {
  let component: MeesageSenderComponent;
  let fixture: ComponentFixture<MeesageSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeesageSenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeesageSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
