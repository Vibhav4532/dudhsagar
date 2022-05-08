import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingAddComponent } from './bookingadd.component';

describe('BookingaddComponent', () => {
  let component: BookingAddComponent;
  let fixture: ComponentFixture<BookingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
