import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrinterService } from '../../../../core/services/printer.service';

@Component({
  selector: 'app-repair-banner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './repair-banner.component.html',
  styleUrl: './repair-banner.component.scss'
})
export class RepairBannerComponent {
  email = '';
  successMessage = '';

  constructor(private printerService: PrinterService) {}

  onSubmit() {
    if (!this.email || !this.email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    this.printerService.submitQuoteRequest(this.email).subscribe(res => {
      if (res.success) {
        this.successMessage = res.message;
        this.email = '';
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      }
    });
  }
}
