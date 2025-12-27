import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';

import {CustomersService} from './customers.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomerFormComponent} from './customer-form/customer-form.component';
import {Customer} from '../../shared/models/customer.model';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit, OnDestroy {
  customersService = inject(CustomersService);
  ngbModalService = inject(NgbModal)
  customers = signal<Customer[]>([]);
  customersCount = 0;
  isLoading = signal(true)

  ngOnInit() {
    this.getCustomers();
  }

  ngOnDestroy() {
    this.customersService.reset()
  }

  openCustomerModal(customer?: any) {
    const modalRef = this.ngbModalService.open(CustomerFormComponent)
    if (customer) modalRef.componentInstance.customer = customer;

    modalRef.result.then(result => this.onCustomerSubmitted(result), reason => reason)
  }

  getCustomers() {
    this.customersService.loadCustomers().subscribe((res: any) => {
      if (this.customersCount <= 0) this.customersCount = res.total

      this.customers.set(res.users)
      this.isLoading.set(false)
    });
  }

  deleteCustomer(id: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customersService.deleteCustomer(id).subscribe((res: any) => {
        this.customers.update((customers) =>
          customers.filter((customer) => customer.id !== res.id)
        );
      });
    }
  }

  onCustomerSubmitted(customer: any) {
    switch (customer.action) {
      case 'update':
        this.customersService.updateCustomer(customer).subscribe(((res: any) => {
          this.customers.update((customers) => customers.map((c) => (c.id === res.id ? res : c)));
        }));
        break;
      case 'add':
        this.customersService.addNewCustomer(customer).subscribe((res: any) => {
          this.customers.update((customers) => [res, ...customers]);
        });
        break;
    }
  }

  onPaginationChange(data: any) {
    this.customersService.onPaginationChange(data)
    this.getCustomers();
  }
}
