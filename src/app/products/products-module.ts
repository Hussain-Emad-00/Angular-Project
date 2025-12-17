import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideHttpClient} from '@angular/common/http';

import {ProductsRoutingModule} from './products-routing-module';
import {Products} from './products';
import {ProductDetailsModule} from '../product-details/product-details-module';
import {HeaderComponent} from '../shared/header/header';
import {Toast} from "../shared/toast/toast";

@NgModule({
  declarations: [Products],
  imports: [CommonModule, ProductsRoutingModule, ProductDetailsModule, HeaderComponent, Toast],
  providers: [provideHttpClient()],
})
export class ProductsModule {
}
