import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuard} from '../../core/guards/admin-guard';
import {ProductCardComponent} from './product-card/product-card.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductComponent} from './product/product.component';

const routes: Routes = [
  {
    path: '',
    title: 'Products',
    component: ProductCardComponent,
  },
  {
    path: 'list',
    title: 'Products',
    canActivate: [AdminGuard],
    component: ProductListComponent,
  },
  {
    path: 'list/:id',
    title: 'Product',
    canActivate: [AdminGuard],
    component: ProductComponent,
  },
  {
    path: ':id',
    title: 'Product',
    component: ProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
}
