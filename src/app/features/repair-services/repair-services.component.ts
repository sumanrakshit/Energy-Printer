import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { PrinterService } from '../../core/services/printer.service';
import { RepairService } from '../../shared/interfaces/printer.interface';

@Component({
  selector: 'app-repair-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ServiceCardComponent],
  templateUrl: './repair-services.component.html',
  styleUrl: './repair-services.component.scss'
})
export class RepairServicesComponent implements OnInit {
  services: RepairService[] = [];
  selectedService: RepairService | null = null;
  bookingForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private printerService: PrinterService
  ) {}

  ngOnInit() {
    this.printerService.getServices().subscribe(services => {
      this.services = services;
      if (services.length > 0) {
        this.selectedService = services[0];
      }
      this.initForm();
    });
  }

  initForm() {
    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-()]{7,15}$/)]],
      printerModel: ['', Validators.required],
      serviceAddress: ['', Validators.required],
      serviceType: [this.selectedService?.name || '', Validators.required],
      preferredDate: ['', Validators.required],
      preferredTime: ['', Validators.required],
      issueDescription: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSelectService(service: RepairService) {
    this.selectedService = service;
    this.bookingForm.patchValue({
      serviceType: service.name
    });
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.errorMessage = 'Please fill out all required fields with valid details.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
      return;
    }

    this.printerService.submitBooking(this.bookingForm.value).subscribe(res => {
      if (res.success) {
        this.successMessage = res.message;
        this.bookingForm.reset({
          serviceType: this.selectedService?.name || ''
        });
        setTimeout(() => {
          this.successMessage = '';
        }, 8000);
      }
    });
  }
}
