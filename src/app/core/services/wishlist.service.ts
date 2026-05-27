import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Printer } from '../../shared/interfaces/printer.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems$ = new BehaviorSubject<Printer[]>([]);

  getWishlistItems(): Observable<Printer[]> {
    return this.wishlistItems$.asObservable();
  }

  getWishlistCount(): Observable<number> {
    return this.wishlistItems$.pipe(
      map(items => items.length)
    );
  }

  toggleWishlist(product: Printer): void {
    const current = this.wishlistItems$.getValue();
    const exists = current.some(item => item.id === product.id);

    if (exists) {
      this.wishlistItems$.next(current.filter(item => item.id !== product.id));
    } else {
      this.wishlistItems$.next([...current, product]);
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistItems$.getValue().some(item => item.id === productId);
  }
}
