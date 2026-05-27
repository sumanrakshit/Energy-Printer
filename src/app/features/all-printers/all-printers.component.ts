import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { PrinterService } from '../../core/services/printer.service';
import { Printer } from '../../shared/interfaces/printer.interface';

@Component({
  selector: 'app-all-printers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductCardComponent],
  templateUrl: './all-printers.component.html',
  styleUrl: './all-printers.component.scss'
})
export class AllPrintersComponent implements OnInit {
  printers: Printer[] = [];
  filteredPrinters: Printer[] = [];

  // Filter States
  searchText = '';
  selectedCategory = '';
  selectedBrand = '';
  selectedPriceRange = '';
  selectedSort = 'featured';

  // Dropdown options
  categories = ['All-in-One', 'Inkjet Printers', 'Laser Printers', 'Refurbished'];
  brands = ['Canon', 'Epson', 'HP', 'Brother'];
  priceRanges = [
    { label: 'Under $150', value: 'under-150' },
    { label: '$150 - $300', value: '150-300' },
    { label: 'Over $300', value: 'over-300' }
  ];

  constructor(
    private printerService: PrinterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.printerService.getPrinters().subscribe(printers => {
      this.printers = printers;
      this.filteredPrinters = [...printers];

      // Read query params (e.g. from Category click)
      this.route.queryParams.subscribe(params => {
        if (params['category']) {
          const cat = params['category'];
          if (cat === 'Latest Models') {
            this.filteredPrinters = this.printers.filter(p => p.badgeType === 'new');
            this.selectedCategory = '';
          } else if (cat === 'Popular Models') {
            this.filteredPrinters = this.printers.filter(p => p.badgeType === 'popular');
            this.selectedCategory = '';
          } else {
            this.selectedCategory = cat;
            this.applyFilters();
          }
        } else {
          this.applyFilters();
        }
      });
    });
  }

  applyFilters() {
    let result = [...this.printers];

    // Search filter
    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.brand.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    // Category filter
    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    // Brand filter
    if (this.selectedBrand) {
      result = result.filter(p => p.brand === this.selectedBrand);
    }

    // Price filter
    if (this.selectedPriceRange) {
      if (this.selectedPriceRange === 'under-150') {
        result = result.filter(p => p.price < 150);
      } else if (this.selectedPriceRange === '150-300') {
        result = result.filter(p => p.price >= 150 && p.price <= 300);
      } else if (this.selectedPriceRange === 'over-300') {
        result = result.filter(p => p.price > 300);
      }
    }

    // Sorting
    if (this.selectedSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.selectedSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (this.selectedSort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    this.filteredPrinters = result;
  }

  clearFilters() {
    this.searchText = '';
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.selectedPriceRange = '';
    this.selectedSort = 'featured';
    this.filteredPrinters = [...this.printers];
  }
}
