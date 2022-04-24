import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingupdateComponent } from './bookingupdate.component';

describe('BookingupdateComponent', () => {
  let component: BookingupdateComponent;
  let fixture: ComponentFixture<BookingupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
