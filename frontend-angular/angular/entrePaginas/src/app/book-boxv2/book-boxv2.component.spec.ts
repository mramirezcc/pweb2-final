import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBoxv2Component } from './book-boxv2.component';

describe('BookBoxv2Component', () => {
  let component: BookBoxv2Component;
  let fixture: ComponentFixture<BookBoxv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookBoxv2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookBoxv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
