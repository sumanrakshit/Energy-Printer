import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Printer } from '../../shared/interfaces/printer.interface';

export interface CartItem {
  product: Printer;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }

  getCartCount(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + item.quantity, 0))
    );
  }

  addToCart(product: Printer): void {
    const currentItems = this.cartItems$.getValue();
    const existingIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingIndex > -1) {
      const updated = [...currentItems];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + 1
      };
      this.cartItems$.next(updated);
    } else {
      this.cartItems$.next([...currentItems, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: string): void {
    const currentItems = this.cartItems$.getValue();
    this.cartItems$.next(currentItems.filter(item => item.product.id !== productId));
  }

  clearCart(): void {
    this.cartItems$.next([]);
  }
}
