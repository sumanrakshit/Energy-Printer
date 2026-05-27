import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() buttonText?: string;
  @Input() buttonLink?: string;
}
