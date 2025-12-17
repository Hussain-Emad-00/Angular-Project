import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideHttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';

import {CustomerDetails} from './customer-details';
import {CustomerForm} from "../customers/customer-form/customer-form";


@NgModule({
  declarations: [CustomerDetails],
  imports: [CommonModule, RouterLink, CustomerForm],
  providers: [provideHttpClient()],
})
export class CustomerDetailsModule {
}
