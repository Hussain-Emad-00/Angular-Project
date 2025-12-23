import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

import {PaginationComponent} from '../../shared/components/pagination/pagination.component';
import {CustomersComponent} from './customers.component';
import {CustomerFormComponent} from './customer-form/customer-form.component';
import {CustomerComponent} from './customer/customer.component';
import {CustomersRoutingModule} from './customers-routing-module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerFormComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationComponent,
    RouterLink,
    ReactiveFormsModule,
    CustomersRoutingModule,
    NgbModule
  ],
})
export class CustomersModule {
}
