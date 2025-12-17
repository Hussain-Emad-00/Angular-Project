import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY, tap} from 'rxjs';

import {Customer as CustomerModel} from '../../shared/customer.model';
import {CustomersService} from '../customers/customers.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerDetailsService {
  loading = signal(true)
  customer = signal<CustomerModel | null>(null)
  private http = inject(HttpClient);
  private customersService = inject(CustomersService)

  getCustomer(id: string) {
    return this.http.get(`https://dummyjson.com/users/${id}`)
      .pipe(
        tap((res: any) => {
          this.customer.set(res)
          this.loading.set(false)
        }),
        catchError(error => {
          console.error('Get customers failed', error);
          return EMPTY;
        })
      )
  }

  onCustomerSubmitted(customer: any) {
    return this.customersService.updateCustomer(customer)
      .pipe(
        tap(res => this.customer.set(res)),
        catchError(error => {
          console.error('Get customers failed', error);
          return EMPTY;
        })
      )
  }
}
