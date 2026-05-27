import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { PrinterService } from '../../../../core/services/printer.service';
import { Printer } from '../../../../shared/interfaces/printer.interface';

@Component({
  selector: 'app-latest-models',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, SectionHeaderComponent],
  templateUrl: './latest-models.component.html',
  styleUrl: './latest-models.component.scss'
})
export class LatestModelsComponent implements OnInit {
  latestPrinters: Printer[] = [];

  constructor(private printerService: PrinterService) {}

  ngOnInit() {
    this.printerService.getLatestPrinters().subscribe(printers => {
      this.latestPrinters = printers.slice(0, 3);
    });
  }
}
