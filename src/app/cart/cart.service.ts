import {computed, Injectable} from '@angular/core';

import {db} from './db';
import {CartItem} from './cart.model';
import {liveQuery} from 'dexie';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$ = liveQuery(() => db.cartItems.toArray())
  cart = toSignal<CartItem[]>(this.cart$);
  total = computed(() => {
    const items = this.cart()
    if (!items) return 0;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2)
  });
  count = computed(() => {
    const items = this.cart();
    if (!items) return 0;
    return items.reduce((sum, item) => sum + item.quantity, 0);
  });

  async addToCart(product: any) {
    const existItem = await db.cartItems.where({id: product.id}).first();
    if (product.quantity >= product.stock) product.quantity = product.stock;

    if (existItem) {
      if (existItem.quantity >= product.stock) return false;
      existItem.quantity += product.quantity;
      await db.cartItems.put(existItem)
    } else await db.cartItems.add(product);

    return true;
  }

  async removeFromCart(id: number) {
    await db.cartItems.where({id}).delete();
  }

  async updateQuantity(id: number, quantity: number) {
    const item = await db.cartItems.where({id}).first();
    if (!item) return;

    if (quantity >= item.stock) quantity = item.stock;
    item.quantity = quantity;

    await db.cartItems.put(item)
  }

  async clearCart() {
    await db.cartItems.clear()
  }
}
