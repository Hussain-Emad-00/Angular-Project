import {Component, inject} from '@angular/core';

import {CartService} from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
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
    this.cartService.removeFromCart(id)
  }
}
