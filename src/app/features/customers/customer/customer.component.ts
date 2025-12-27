import {Component, inject, Input, OnInit, signal} from '@angular/core';

import {CustomerService} from './customer.service';
import {Customer as CustomerModel} from '../../../shared/models/customer.model';
import {CustomerFormComponent} from '../customer-form/customer-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  standalone: false,
})
export class CustomerComponent implements OnInit {
  detailsService = inject(CustomerService);
  ngbModalService = inject(NgbModal)
  @Input({required: true}) id!: string;
  isLoading = signal(true);
  customer = signal<CustomerModel | undefined>(undefined)

  ngOnInit() {
    this.detailsService.getCustomer(this.id).subscribe((res: any) => {
      this.customer.set(res)
      this.isLoading.set(false)
    });
  }

  openCustomerModal() {
    const modalRef = this.ngbModalService.open(CustomerFormComponent)
    modalRef.componentInstance.customer = this.customer();

    modalRef.result.then(({action, ...result}: any) => this.customer.set(result), reason => reason)
  }
}
