import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideHttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {ProductDetails} from './product-details';

@NgModule({
  declarations: [ProductDetails],
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  providers: [provideHttpClient()]
})
export class ProductDetailsModule {
}
