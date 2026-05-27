import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from '../../../../shared/components/category-card/category-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent],
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.scss'
})
export class CategorySectionComponent {
  categories = [
    { title: 'Latest Models', iconClass: 'bi-star' },
    { title: 'Popular Models', iconClass: 'bi-fire' },
    { title: 'Inkjet Printers', iconClass: 'bi-droplet' },
    { title: 'Laser Printers', iconClass: 'bi-lightning' },
    { title: 'All-in-One', iconClass: 'bi-layers' },
    { title: 'Refurbished', iconClass: 'bi-recycle' }
  ];

  constructor(private router: Router) {}

  selectCategory(categoryTitle: string) {
    this.router.navigate(['/all-printers'], { queryParams: { category: categoryTitle } });
  }
}
