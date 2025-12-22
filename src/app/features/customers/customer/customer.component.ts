import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CustomerService} from './customer.service';
import {ModalService} from '../../../core/services/modal.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  standalone: false,
})
export class CustomerComponent implements OnInit {
  modalService = inject(ModalService);
  detailsService = inject(CustomerService);
  customer = this.detailsService.customer;
  loading = this.detailsService.loading;
  private route = inject(ActivatedRoute);
  id = signal(this.route.snapshot.paramMap.get('id') || '');

  ngOnInit() {
    this.detailsService.getCustomer(this.id()).subscribe();
  }

  editCustomer() {
    this.modalService.open('addNewCustomerModal');
  }

  onCustomerSubmitted(customer: any) {
    this.detailsService.onCustomerSubmitted(customer).subscribe((res: any) => {
      this.modalService.close('addNewCustomerModal');
    });
  }
}
