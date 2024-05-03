import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsAppointmentListComponent } from './patients-appointment-list.component';

describe('PatientsAppointmentListComponent', () => {
  let component: PatientsAppointmentListComponent;
  let fixture: ComponentFixture<PatientsAppointmentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsAppointmentListComponent]
    });
    fixture = TestBed.createComponent(PatientsAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
