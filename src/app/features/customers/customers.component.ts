import {Component, inject, OnInit} from '@angular/core';

import {CustomersService} from './customers.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomerFormComponent} from './customer-form/customer-form.component';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  customersService = inject(CustomersService);
  customers = this.customersService.customers;
  loading = this.customersService.loading;
  ngbModalService = inject(NgbModal)

  ngOnInit(): void {
    this.getCustomers();
  }

  openCustomerModal(customer?: any) {
    const modalRef = this.ngbModalService.open(CustomerFormComponent)
    if (customer) modalRef.componentInstance.customer = customer;

    modalRef.result.then(result => this.onCustomerSubmitted(result), reason => reason)
  }

  getCustomers() {
    this.customersService.loadCustomers().subscribe();
  }

  deleteCustomer(id: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customersService.deleteCustomer(id).subscribe();
    }
  }

  onCustomerSubmitted(customer: any) {
    switch (customer.action) {
      case 'update':
        this.customersService.updateCustomer(customer).subscribe();
        break;
      case 'add':
        this.customersService.addNewCustomer(customer).subscribe();
        break;
    }
  }

  currentPage(page: number) {
    this.customersService.currentPage(page);
    this.getCustomers();
  }

  pageSize(size: number) {
    this.customersService.pageSize(size);
    this.getCustomers();
  }
}
