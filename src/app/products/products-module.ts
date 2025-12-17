import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideHttpClient} from '@angular/common/http';

import {ProductsRoutingModule} from './products-routing-module';
import {Products} from './products';
import {ProductDetailsModule} from '../product-details/product-details-module';
import {HeaderComponent} from '../shared/header/header';

@NgModule({
  declarations: [Products],
  imports: [CommonModule, ProductsRoutingModule, ProductDetailsModule, HeaderComponent],
  providers: [provideHttpClient()],
})
export class ProductsModule {
}
