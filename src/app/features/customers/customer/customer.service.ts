import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private http = inject(HttpClient);

  getCustomer(id: string) {
    return this.http.get(`https://dummyjson.com/users/${id}`).pipe(
      catchError((error) => {
        console.error('Get customer failed', error);
        return EMPTY;
      })
    );
  }
}
