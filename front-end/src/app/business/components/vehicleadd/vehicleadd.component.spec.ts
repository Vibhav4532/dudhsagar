import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleaddComponent } from './vehicleadd.component';

describe('VehicleaddComponent', () => {
  let component: VehicleaddComponent;
  let fixture: ComponentFixture<VehicleaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
