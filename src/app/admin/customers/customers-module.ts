import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideHttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

import {Customers} from './customers';
import {PaginationComponent} from '../../shared/pagination/pagination';
import {CustomerForm} from './customer-form/customer-form';


@NgModule({
  declarations: [Customers],
  imports: [CommonModule, FormsModule, PaginationComponent, RouterLink, CustomerForm],
  providers: [provideHttpClient()]
})
export class CustomersModule {
}
