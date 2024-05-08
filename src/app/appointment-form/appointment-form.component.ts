import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AppointmentService } from '../appointment/appointment.service';
import { Appointment } from '../models/appointment';
import { Router,ActivatedRoute } from '@angular/router';
import { Doctor } from '../models/doctor';
@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit{

appointmentForm: FormGroup = new FormGroup({});
doctors: { id: string, name: string }[] = [];
  availableAppointments: Appointment[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      department: ['', Validators.required],
      doctor: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  fetchDoctors(): void {
    const selectedDepartment = this.appointmentForm.get('department')?.value;
    this.appointmentService.getDoctors(selectedDepartment)
      .subscribe((doctors: Doctor[]) => {
        this.doctors = doctors.map(doctor => ({
          id: doctor.doctorID,
          name: `Dr. ${doctor.fname} ${doctor.lname}`
        }));
      });
  }

  fetchAppointments(): void {
    const selectedDoctorId = this.appointmentForm.get('doctor')?.value;
    if (selectedDoctorId) {
      this.appointmentService.getAvailableAppointments(selectedDoctorId)
        .subscribe((appointments: Appointment[]) => {
          this.availableAppointments = appointments;
        });

        
    }
  }

  bookAppointment(appointmentID: string): void {
    this.appointmentService.addAppointment(appointmentID).subscribe({
      next: () => {
        // Handle response here, e.g., show a success message or update the view
        alert('Appointment booked successfully!');
        // Optionally, you might want to remove the booked appointment from the list
        this.availableAppointments = this.availableAppointments.filter(appointment => appointment.appointmentID !== appointmentID);
      },
      error: (error) => {
        // Handle errors here, e.g., show an error message
        console.error('Error booking appointment:', error);
        alert('Failed to book appointment.');
      }
    });
  }
  

}