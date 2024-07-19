import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpoComponent } from './add-spo.component';

describe('AddSpoComponent', () => {
  let component: AddSpoComponent;
  let fixture: ComponentFixture<AddSpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSpoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
