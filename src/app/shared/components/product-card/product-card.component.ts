import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Printer } from '../../interfaces/printer.interface';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product!: Printer;

  quantity = 0;
  isInWishlist = false;
  private cartSubscription!: Subscription;
  private wishlistSubscription!: Subscription;

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartItems().subscribe(items => {
      const item = items.find(i => i.product.id === this.product.id);
      this.quantity = item ? item.quantity : 0;
    });

    this.wishlistSubscription = this.wishlistService.getWishlistItems().subscribe(items => {
      this.isInWishlist = items.some(i => i.id === this.product.id);
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    if (this.wishlistSubscription) {
      this.wishlistSubscription.unsubscribe();
    }
  }

  toggleWishlist(): void {
    this.wishlistService.toggleWishlist(this.product);
  }

  incrementQuantity(): void {
    this.cartService.addToCart(this.product);
  }

  decrementQuantity(): void {
    this.cartService.decrementQuantity(this.product.id);
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
