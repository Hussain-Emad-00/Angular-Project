import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductDetails} from '../product-details/product-details';
import {Products} from './products';

const routes: Routes = [
  {path: "", title: "Products", component: Products},
  {path: ":id", component: ProductDetails},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
