import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  getProduct(id: number) {
    return this.http.get('https://dummyjson.com/products/' + id).pipe(
      catchError((error) => {
        console.error('Get Product failed', error);
        return EMPTY;
      })
    );
  }
}
