import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBoxv1Component } from './book-boxv1.component';

describe('BookBoxv1Component', () => {
  let component: BookBoxv1Component;
  let fixture: ComponentFixture<BookBoxv1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookBoxv1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookBoxv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
