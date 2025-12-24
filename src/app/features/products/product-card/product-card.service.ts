import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY, tap} from 'rxjs';
import {Product as ProductModel} from '../../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductCardService {
  products = signal<ProductModel[]>([]);
  skipped = 0;
  productsCount = 0;
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get(`https://dummyjson.com/products?limit=10&skip=0`).pipe(
      tap((res: any) => {
        if (this.productsCount <= 0) this.productsCount = res.total;
        this.products.set(res.products);
      }),
      catchError((error) => {
        console.error('Get customers failed', error);
        return EMPTY;
      })
    );
  }

  loadMoreProducts() {
    if (this.productsCount > this.skipped) {
      this.skipped += 10;
      this.http.get(`https://dummyjson.com/products?limit=10&skip=${this.skipped}`)
        .pipe(
          catchError((error) => {
            console.error('Load more customers failed', error);
            return EMPTY;
          })
        )
        .subscribe((res: any) =>
          this.products.update((old) => [...old, ...res.products])
        )
    }
  }

  reset() {
    this.productsCount = 0;
    this.skipped = 0;
    this.products.set([])
  }
}
