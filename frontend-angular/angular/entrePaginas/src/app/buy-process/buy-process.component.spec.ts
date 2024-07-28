import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProcessComponent } from './buy-process.component';

describe('BuyProcessComponent', () => {
  let component: BuyProcessComponent;
  let fixture: ComponentFixture<BuyProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
