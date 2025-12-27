import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductCardComponent} from './product-card/product-card.component';
import {ProductComponent} from './product/product.component';
import {AdminGuard} from '../../core/guards/admin-guard';
import {ProductListComponent} from './product-list/product-list.component';
import {UserGuard} from '../../core/guards/user-guard';

const routes: Routes = [
  {
    path: '',
    title: 'Products',
    component: ProductCardComponent,
    canActivate: [UserGuard],
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
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
}
