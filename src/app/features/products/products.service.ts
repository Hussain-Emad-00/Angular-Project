import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, tap } from 'rxjs';
import { Product as ProductModel } from '../../shared/models/product.model';
import { AuthService } from '../../core/auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = signal<ProductModel[]>([]);
  skipped = signal(0);
  productsCount = signal(0);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getProducts() {
    return this.http.get(`https://dummyjson.com/products?limit=10&skip=${this.skipped()}`).pipe(
      tap((res: any) => {
        this.products.update((oldProducts) => [...oldProducts, ...res.products]);
      }),
      catchError((error) => {
        console.error('Get customers failed', error);
        return EMPTY;
      })
    );
  }

  loadMoreProducts() {
    if (this.productsCount() > this.skipped()) {
      this.skipped.update((s) => s + 10);
      this.getProducts().subscribe();
    }
  }

  getProductCount() {
    return this.http.get(`https://dummyjson.com/products`).pipe(
      tap((res: any) => {
        this.productsCount.set(res.total);
      }),
      catchError((error) => {
        console.error('Get customers failed', error);
        return EMPTY;
      })
    );
  }

  isAdmin() {
    return this.authService.isAdmin$();
  }

  reset() {
    this.products.set([]);
    this.skipped.set(0);
  }
}
