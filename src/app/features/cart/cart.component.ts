import {Component, inject} from '@angular/core';

import {CartService} from '../../core/services/cart.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CurrencyPipe],
})
export class CartComponent {
  cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  clearCart() {
    this.cartService.clearCart();
  }

  updateItemQuantity(id: number, quantity: number) {
    this.cartService.updateQuantity(id, quantity);
  }

  removeItemFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }
}
