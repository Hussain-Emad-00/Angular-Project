import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {provideHttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AdminProducts} from './products';
import {PaginationComponent} from '../../shared/pagination/pagination';
import {ProductForm} from './product-form/product-form';


@NgModule({
  declarations: [AdminProducts],
  imports: [CommonModule, PaginationComponent, RouterLink, ProductForm, FormsModule, NgOptimizedImage],
  providers: [provideHttpClient()]
})
export class ProductsModule {
}
