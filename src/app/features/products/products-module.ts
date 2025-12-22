import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing-module';
import {ProductsComponent} from './products.component';
import {ToastComponent} from '../../shared/components/toast/toast.component';
import {ProductComponent} from './product/product.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {ProductFormComponent} from './product-form/product-form.component';
import {ProductListComponent} from './product-list/product-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationComponent} from '../../shared/components/pagination/pagination.component';

@NgModule({
  declarations: [ProductsComponent, ProductComponent, ProductCardComponent, ProductFormComponent, ProductListComponent],
  imports: [CommonModule, ProductsRoutingModule, ToastComponent, FormsModule, ReactiveFormsModule, PaginationComponent],
  providers: [],
  exports: [ProductsComponent, ProductComponent, ProductCardComponent, ProductFormComponent, ProductListComponent]
})
export class ProductsModule {
}
