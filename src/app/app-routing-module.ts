import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuardFn} from '@auth0/auth0-angular';

import {Cart} from './cart/cart';
import {NotfoundComponent} from './notfound/notfound.component';
import {AdminGuard} from './admin/admin-guard';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'cart', title: "Cart", component: Cart, canActivate: [authGuardFn]},
  {path: 'not-found', title: 'Not Found', component: NotfoundComponent},
  {
    path: 'products',
    loadChildren: () => import("./products/products-module").then(m => m.ProductsModule),
    canActivate: [authGuardFn]
  },
  {
    path: 'auth',
    loadChildren: () => import("./auth/auth-module").then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import("./admin/admin-module").then(m => m.AdminModule),
    canActivate: [authGuardFn, AdminGuard],
  },
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule
      .forRoot(routes, {
          bindToComponentInputs: true,
          paramsInheritanceStrategy: 'always',
        }
      )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
