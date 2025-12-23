import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ProductsRoutingModule} from './products-routing-module';
import {ProductsComponent} from './products.component';
import {ProductComponent} from './product/product.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {ProductFormComponent} from './product-form/product-form.component';
import {ProductListComponent} from './product-list/product-list.component';
import {PaginationComponent} from '../../shared/components/pagination/pagination.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductCardComponent,
    ProductFormComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationComponent,
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle,
    NgbToast
  ],
  providers: [],
})
export class ProductsModule {
}
