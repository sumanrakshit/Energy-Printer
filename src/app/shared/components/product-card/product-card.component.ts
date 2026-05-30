import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Printer } from '../../interfaces/printer.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Printer;

  openPdf(): void {
    const pdfMap: { [key: string]: string } = {
      'canon-ts8320-new': '/specs/canon-pixma-ts8320.pdf',
      'canon-ts8320-pop': '/specs/canon-pixma-ts8320.pdf',
      'epson-et4760-new': '/specs/epson-ecotank-et-4760.pdf',
      'hp-9015e-new': '/specs/hp-officejet-pro-9015e.pdf',
      'brother-l2350-pop': '/specs/brother-hl-l2350dw.pdf',
      'hp-m404n-pop': '/specs/hp-laserjet-pro-m404n.pdf',
      'epson-xp7100-ref': '/specs/epson-expression-xp-7100.pdf',
      'hp-m15w-ref': '/specs/hp-laserjet-pro-m15w.pdf'
    };

    const pdfUrl = pdfMap[this.product.id] || '/specs/generic-printer-spec.pdf';
    window.open(pdfUrl, '_blank');
  }
}
