import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Admin} from './admin';
import {AdminRoutingModule} from './admin-routing-module';
import {ProductsModule} from './products/products-module';
import {CustomersModule} from './customers/customers-module';
import {CustomerDetailsModule} from './customer-details/customer-details-module';
import {SidebarComponent} from '../shared/sidebar/sidebar';
import {HeaderComponent} from '../shared/header/header';

@NgModule({
  declarations: [Admin],
  imports: [
    CommonModule,
    CustomerDetailsModule,
    AdminRoutingModule,
    ProductsModule,
    CustomersModule,
    SidebarComponent,
    HeaderComponent
  ],
})
export class AdminModule {
}
