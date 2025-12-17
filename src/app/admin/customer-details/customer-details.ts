import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CustomerDetailsService} from './customer-details.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-customer-details',
  standalone: false,
  templateUrl: './customer-details.html'
})
export class CustomerDetails implements OnInit {
  modalService = inject(ModalService)
  detailsService = inject(CustomerDetailsService)
  customer = this.detailsService.customer
  loading = this.detailsService.loading
  private route = inject(ActivatedRoute);
  id = signal(this.route.snapshot.paramMap.get('id') || '')

  ngOnInit() {
    this.detailsService.getCustomer(this.id()).subscribe()
  }

  editCustomer() {
    this.modalService.open('addNewCustomerModal')
  }

  onCustomerSubmitted(customer: any) {
    this.detailsService.onCustomerSubmitted(customer).subscribe((res: any) => {
      this.modalService.close('addNewCustomerModal');
    })
  }
}
