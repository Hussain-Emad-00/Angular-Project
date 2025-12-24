import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  size = 50;
  skipped = 0;
  private baseUrl = 'https://dummyjson.com/users';
  private http = inject(HttpClient);

  loadCustomers() {
    return this.http.get(`${this.baseUrl}?limit=${this.size}&skip=${this.skipped}`).pipe(
      catchError((error) => {
        console.error('Get customers failed', error);
        return EMPTY;
      })
    );
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Delete customer failed', error);
        return EMPTY;
      })
    );
  }

  addNewCustomer({action, id, ...customer}: any) {
    return this.http.post(`${this.baseUrl}/add`, customer).pipe(
      catchError((error) => {
        console.error('Add customer failed', error);
        return EMPTY;
      })
    );
  }

  updateCustomer({action, id, ...customer}: any) {
    return this.http.put(`${this.baseUrl}/${id}`, customer).pipe(
      catchError((error) => {
        console.error('Update customer failed', error);
        return EMPTY;
      })
    );
  }

  currentPage(page: number) {
    this.skipped = (page * this.size) - this.size;
  }

  pageSize(size: number) {
    this.skipped = 0;
    this.size = size;
  }
}
