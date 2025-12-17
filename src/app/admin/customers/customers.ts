import {Component, inject, OnInit, signal} from '@angular/core';

import {CustomersService} from './customers.service';
import {Customer} from '../../shared/customer.model';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.html',
  styleUrl: './customers.scss',
})
export class Customers implements OnInit {
  customersService = inject(CustomersService);
  modalService = inject(ModalService);
  selectedCustomer = signal<Customer | null>(null);
  customers = this.customersService.customers;
  loading = this.customersService.loading;

  ngOnInit(): void {
    this.getCustomers()
  }

  getCustomers() {
    this.customersService.loadCustomers().subscribe()
  }

  deleteCustomer(id: number) {
    if (confirm("Are you sure you want to delete this customer?")) {
      this.customersService.deleteCustomer(id).subscribe()
    }
  }

  editCustomer(id: number) {
    this.selectedCustomer.set(this.customers().find((c) => c.id == id) || null)
    this.modalService.open('addNewCustomerModal')
  }

  addNewCustomer() {
    this.selectedCustomer.set(null)
    this.modalService.open('addNewCustomerModal')
  }

  onCustomerSubmitted(customer: any) {
    switch (customer.action) {
      case 'update':
        this.customersService.updateCustomer(customer).subscribe(res => {
          this.modalService.close('addNewCustomerModal')
        })
        break;
      case 'add':
        this.customersService.addNewCustomer(customer).subscribe(res => {
          this.modalService.close('addNewCustomerModal')
        })
        this.selectedCustomer.set(null)
        break;
    }
  }

  currentPage(page: number) {
    this.customersService.currentPage(page)
    this.getCustomers()
  }

  pageSize(size: number) {
    this.customersService.pageSize(size)
    this.getCustomers()
  }
}
