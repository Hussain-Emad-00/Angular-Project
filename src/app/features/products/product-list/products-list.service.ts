import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductsListService {
  size = 50;
  skipped = 0;
  private http = inject(HttpClient)
  private baseUrl = 'https://dummyjson.com/products';

  loadProducts() {
    return this.http.get(`${this.baseUrl}?limit=${this.size}&skip=${this.skipped}`)
      .pipe(
        catchError(error => {
          console.error('Get Products failed', error);
          return EMPTY;
        })
      )
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Delete Product failed', error);
          return EMPTY;
        })
      )
  }

  addNewProduct({action, id, ...product}: any) {
    return this.http.post(`${this.baseUrl}/add`, product)
      .pipe(
        catchError(error => {
          console.error('Add Product failed', error);
          return EMPTY;
        })
      )
  }

  updateProduct({action, id, ...product}: any) {
    return this.http.put(`${this.baseUrl}/${id}`, product)
      .pipe(
        catchError(error => {
          console.error('Update Product failed', error);
          return EMPTY;
        })
      )
  }

  currentPage(page: number) {
    this.skipped = ((page * this.size)) - this.size
  }

  pageSize(size: number) {
    this.skipped = 0
    this.size = size;
  }
}
