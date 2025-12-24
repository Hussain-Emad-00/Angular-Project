import {Component, inject, Input, OnInit} from '@angular/core';

import {CustomerService} from './customer.service';
import {Customer as CustomerModel} from '../../../shared/models/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  standalone: false,
})
export class CustomerComponent implements OnInit {
  detailsService = inject(CustomerService);
  @Input({required: true}) id!: string;
  isLoading = true;
  customer: CustomerModel | undefined

  ngOnInit() {
    this.detailsService.getCustomer(this.id).subscribe((res: any) => {
      this.isLoading = false
      this.customer = res
    });
  }
}
