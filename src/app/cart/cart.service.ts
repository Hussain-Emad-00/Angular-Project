import {Injectable, signal} from '@angular/core';

import {CartItem} from './cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<CartItem[]>([])

  constructor() {
    this.loadCart()
  }

  saveCart() {
    localStorage.setItem('cart-products', JSON.stringify(this.cart()));
  }

  loadCart() {
    const savedProducts = localStorage.getItem('cart-products');
    this.cart.set(savedProducts ? JSON.parse(savedProducts) : [])
  }

  addToCart(product: any) {
    const exist = this.cart().find((p) => p.id === product.id);
    if (product.quantity >= product.stock) product.quantity = product.stock;

    if (exist) {
      if (exist.quantity >= product.stock) return false;
      exist.quantity += product.quantity;
    } else this.cart.update((products) => [...products, product]);

    this.saveCart();
    return true;
  }

  removeFromCart(id: number) {
    this.cart.update((products) => products.filter((x: any) => x.id !== id))
    this.saveCart();
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.cart().find((x: any) => x.id === id);
    if (!item) return;
    if (quantity >= item.stock) quantity = item.stock;

    item.quantity = quantity;
    this.saveCart();
  }

  clearCart() {
    this.cart.set([]);
    this.saveCart()
  }

  getTotal() {
    return this.cart()
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  }

  getCount() {
    return this.cart().reduce((sum, item) => sum + item.quantity, 0);
  }
}
