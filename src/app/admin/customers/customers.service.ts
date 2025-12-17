import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY, tap} from 'rxjs';

import {Customer} from '../../shared/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  size = signal(50)
  skipped = signal(0)
  customersCount = signal(0)
  customers = signal<Customer[]>([])
  loading = signal(true);
  private baseUrl = 'https://dummyjson.com/users';
  private http = inject(HttpClient)

  constructor() {
    this.getCustomersCount()
  }

  loadCustomers() {
    return this.http.get(`${this.baseUrl}?limit=${this.size()}&skip=${this.skipped()}`)
      .pipe(
        tap((res: any) => {
          this.customers.set(res.users)
          this.loading.set(false)
        }),
        catchError(error => {
          console.error('Get customers failed', error);
          return EMPTY;
        })
      )
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(
        tap((res: any) => {
          this.customers.update((customers) =>
            customers.filter((customer) => customer.id !== id));
        }),
        catchError(error => {
          console.error('Get customers failed', error);
          return EMPTY;
        })
      )
  }

  addNewCustomer({action, id, ...customer}: any) {
    return this.http.post(`${this.baseUrl}/add`, customer)
      .pipe(
        tap((res: any) => {
          this.customers.update((customers) => [res, ...customers])
        }),
        catchError(error => {
          console.error('Get customers failed', error);
          return EMPTY;
        })
      )
  }

  updateCustomer({action, id, ...customer}: any) {
    return this.http.put(`${this.baseUrl}/${id}`, customer)
      .pipe(
        tap((res: any) => {
          this.customers.update((customers) =>
            customers.map((c) => c.id === res.id ? res : c)
          )
        }),
        catchError(error => {
          console.error('Get customers failed', error);
          return EMPTY;
        })
      )
  }

  getCustomersCount() {
    this.http.get(`${this.baseUrl}`)
      .subscribe((res: any) => {
        this.customersCount.set(res.total)
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
