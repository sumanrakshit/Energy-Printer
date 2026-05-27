import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairService } from '../../interfaces/printer.interface';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {
  @Input() service!: RepairService;
  @Input() isSelected = false;
  @Output() selectService = new EventEmitter<RepairService>();

  onSelect() {
    this.selectService.emit(this.service);
  }
}
