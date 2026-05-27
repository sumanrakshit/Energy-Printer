import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Printer } from '../../interfaces/printer.interface';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Printer;

  addedToCart = false;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.product);
    this.addedToCart = true;
    setTimeout(() => {
      this.addedToCart = false;
    }, 1500);
  }

  getStarsArray(rating: number): number[] {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 0; i < floor; i++) {
      stars.push(1);
    }
    if (rating % 1 !== 0) {
      stars.push(0.5);
    }
    while (stars.length < 5) {
      stars.push(0);
    }
    return stars;
  }
}
