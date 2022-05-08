import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveraddComponent } from './driveradd.component';

describe('DriveraddComponent', () => {
  let component: DriveraddComponent;
  let fixture: ComponentFixture<DriveraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveraddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
