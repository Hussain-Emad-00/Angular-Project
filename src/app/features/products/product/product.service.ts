import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, tap } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';
import { Product as ProductModel } from '../../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product = signal<ProductModel | null>(null);
  quantity = signal<number>(1);
  http = inject(HttpClient);
  cartService = inject(CartService);

  getProduct(id: number) {
    return this.http.get<ProductModel>('https://dummyjson.com/products/' + id).pipe(
      tap((product) => {
        this.product.set(product);
      }),
      catchError((error) => {
        console.error('Get customers failed', error);
        return EMPTY;
      })
    );
  }

  changeImage(img: string) {
    this.product.update((p) => ({ ...p!, thumbnail: img }));
  }

  addToCart() {
    const product = {
      id: this.product()?.id,
      thumbnail: this.product()?.thumbnail,
      title: this.product()?.title,
      price: this.product()?.price,
      quantity: this.quantity(),
      stock: this.product()?.stock,
    };

    return this.cartService.addToCart(product);
  }
}
