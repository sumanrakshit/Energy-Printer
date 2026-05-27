import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Printer, RepairService, BookingRequest } from '../../shared/interfaces/printer.interface';
import { IMAGE_PATHS } from '../constants/image-paths';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  private printers: Printer[] = [
    {
      id: 'canon-ts8320-new',
      name: 'Canon PIXMA TS8320',
      brand: 'Canon',
      category: 'All-in-One',
      description: 'Perfect for photo enthusiasts and creative professionals.',
      price: 199.99,
      oldPrice: 249.99,
      rating: 4.5,
      reviewsCount: 95,
      image: IMAGE_PATHS.canonTS8320,
      badgeType: 'new',
      freeService: true
    },
    {
      id: 'epson-et4760-new',
      name: 'Epson EcoTank ET-4760',
      brand: 'Epson',
      category: 'Inkjet Printers',
      description: 'Revolutionary cartridge-free printing with incredible page yields.',
      price: 399.99,
      oldPrice: 449.99,
      rating: 4.8,
      reviewsCount: 203,
      image: IMAGE_PATHS.epsonET4760,
      badgeType: 'new',
      freeService: true
    },
    {
      id: 'hp-9015e-new',
      name: 'HP OfficeJet Pro 9015e',
      brand: 'HP',
      category: 'All-in-One',
      description: 'Smart all-in-one printer with advanced productivity features.',
      price: 279.99,
      oldPrice: 329.99,
      rating: 4.2,
      reviewsCount: 89,
      image: IMAGE_PATHS.hpOfficeJet9015e,
      badgeType: 'new',
      freeService: true
    },
    {
      id: 'brother-l2350-pop',
      name: 'Brother HL-L2350DW',
      brand: 'Brother',
      category: 'Laser Printers',
      description: 'Compact and reliable laser printer for everyday printing needs.',
      price: 149.99,
      oldPrice: 179.99,
      rating: 4.6,
      reviewsCount: 156,
      image: IMAGE_PATHS.brotherL2350,
      badgeType: 'popular',
      freeService: true
    },
    {
      id: 'canon-ts8320-pop',
      name: 'Canon PIXMA TS8320',
      brand: 'Canon',
      category: 'All-in-One',
      description: 'Perfect for photo enthusiasts and creative professionals.',
      price: 199.99,
      oldPrice: 249.99,
      rating: 4.5,
      reviewsCount: 95,
      image: IMAGE_PATHS.canonTS8320,
      badgeType: 'popular',
      freeService: true
    },
    {
      id: 'hp-m404n-pop',
      name: 'HP LaserJet Pro M404n',
      brand: 'HP',
      category: 'Laser Printers',
      description: 'Fast, reliable laser printing for small offices and home use.',
      price: 299.99,
      oldPrice: 349.99,
      rating: 4.7,
      reviewsCount: 128,
      image: IMAGE_PATHS.hpLaserJetM404n,
      badgeType: 'popular',
      freeService: true
    },
    {
      id: 'epson-xp7100-ref',
      name: 'Epson Expression XP-7100 (Refurbished)',
      brand: 'Epson',
      category: 'Refurbished',
      description: 'Refurbished all-in-one with exceptional photo quality.',
      price: 129.99,
      oldPrice: 199.99,
      rating: 4.4,
      reviewsCount: 64,
      image: IMAGE_PATHS.epsonET4760,
      badgeType: null,
      freeService: true
    },
    {
      id: 'hp-m15w-ref',
      name: 'HP LaserJet Pro M15w (Refurbished)',
      brand: 'HP',
      category: 'Refurbished',
      description: 'Refurbished world\'s smallest laser printer in its class.',
      price: 89.99,
      oldPrice: 119.99,
      rating: 4.3,
      reviewsCount: 112,
      image: IMAGE_PATHS.hpLaserJetM404n,
      badgeType: null,
      freeService: true
    }
  ];

  private services: RepairService[] = [
    {
      id: 'repair',
      name: 'Printer Repair',
      description: 'Diagnostic and repair of mechanical errors, paper jams, connectivity issues, and component failures.',
      duration: '1-2 Hours',
      price: 89.99
    },
    {
      id: 'maintenance',
      name: 'Maintenance Service',
      description: 'Full printhead cleaning, internal roller cleaning, calibration, and lubrication for optimal print quality.',
      duration: '45-60 Mins',
      price: 59.99
    },
    {
      id: 'setup',
      name: 'Setup & Installation',
      description: 'Complete unboxing, network configuration, driver installation, and mobile printing setup support.',
      duration: '30-45 Mins',
      price: 49.99
    },
    {
      id: 'onsite',
      name: 'On-site Service',
      description: 'Direct dispatch of certified technician to your home or office for hardware service within 4 hours.',
      duration: 'Varies',
      price: 129.99
    }
  ];

  getPrinters(): Observable<Printer[]> {
    return of(this.printers);
  }

  getLatestPrinters(): Observable<Printer[]> {
    return of(this.printers.filter(p => p.badgeType === 'new'));
  }

  getPopularPrinters(): Observable<Printer[]> {
    return of(this.printers.filter(p => p.badgeType === 'popular'));
  }

  getServices(): Observable<RepairService[]> {
    return of(this.services);
  }

  submitBooking(request: BookingRequest): Observable<{ success: boolean; message: string }> {
    console.log('Booking Service Appointment Submitted:', request);
    return of({
      success: true,
      message: 'Your service appointment has been booked successfully! Our team will contact you shortly.'
    });
  }

  submitQuoteRequest(email: string): Observable<{ success: boolean; message: string }> {
    console.log('Quote Request Submitted for email:', email);
    return of({
      success: true,
      message: 'Your quote request has been received. Check your email for more details!'
    });
  }
}
