import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { PrinterService } from '../../../../core/services/printer.service';
import { Printer } from '../../../../shared/interfaces/printer.interface';

@Component({
  selector: 'app-popular-models',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, SectionHeaderComponent],
  templateUrl: './popular-models.component.html',
  styleUrl: './popular-models.component.scss'
})
export class PopularModelsComponent implements OnInit {
  popularPrinters: Printer[] = [];

  constructor(private printerService: PrinterService) {}

  ngOnInit() {
    this.printerService.getPopularPrinters().subscribe(printers => {
      this.popularPrinters = printers.slice(0, 3);
    });
  }
}
