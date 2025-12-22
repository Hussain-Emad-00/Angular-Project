import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY, tap} from 'rxjs';
import {Product} from '../../../shared/models/product.model';


@Injectable({
  providedIn: 'root',
})
export class ProductsListService {
  size = signal(50)
  skipped = signal(0)
  productsCount = signal(0)
  products = signal<Product[]>([])
  loading = signal(true);
  private http = inject(HttpClient)
  private baseUrl = 'https://dummyjson.com/products';

  constructor() {
    this.getProductsCount()
  }

  loadProducts() {
    return this.http.get(`${this.baseUrl}?limit=${this.size()}&skip=${this.skipped()}`)
      .pipe(
        tap((res: any) => {
          this.products.set(res.products)
          this.loading.set(false)
        }),
        catchError(error => {
          console.error('Get customers failed', error);
          return EMPTY;
        })
      )
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        tap((res: any) => {
          this.products.update((products) =>
            products.filter((product) => product.id !== id));
        }),
        catchError(error => {
          console.error('Get customers failed', error);
          return EMPTY;
        })
      )
  }

  addNewProduct({action, id, ...product}: any) {
    return this.http.post(`${this.baseUrl}/add`, product)
      .pipe(
        tap((res: any) => {
          this.products.update((products) => [res, ...products])
        }),
        catchError(error => {
          console.error('Get customers failed', error);
          return EMPTY;
        })
      )
  }

  updateProduct({action, id, ...product}: any) {
    return this.http.put(`${this.baseUrl}/${id}`, product)
      .pipe(
        tap((res: any) => {
          this.products.update((products) =>
            products.map((p) => p.id === res.id ? res : p)
          )
        }),
        catchError(error => {
          console.error('Get customers failed', error);
          return EMPTY;
        })
      )
  }

  getProductsCount() {
    this.http.get(`${this.baseUrl}`)
      .subscribe((res: any) => {
        this.productsCount.set(res.total)
      })
  }

  currentPage(page: number) {
    this.skipped.set((page * this.size()) - this.size())
  }

  pageSize(size: number) {
    this.skipped.set(0)
    this.size.set(size);
  }
}
