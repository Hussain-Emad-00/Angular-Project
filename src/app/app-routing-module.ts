import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotfoundComponent} from './shared/components/notfound/notfound.component';
import {UserLayout} from './core/layout/user-layout/user-layout';
import {AdminLayout} from './core/layout/admin-layout/admin-layout';
import {AdminGuard} from './core/guards/admin-guard';
import {UserGuard} from './core/guards/user-guard';
import {AuthGuard} from '@auth0/auth0-angular';
import {GuestGuard} from './core/guards/guest-guard';

const routes: Routes = [
  {
    path: '',
    component: UserLayout,
    children: [
      {path: '', redirectTo: 'products', pathMatch: 'full'},
      {
        path: 'products',
        loadChildren: () => import('./features/products/products-module').then(m => m.ProductsModule)
      },
      {
        path: 'cart',
        title: 'Cart',
        loadComponent: () => import('./features/cart/cart.component').then(c => c.CartComponent)
      }
    ],
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: 'products',
        loadChildren: () => import('./features/products/products-module').then(m => m.ProductsModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./features/customers/customers-module').then(m => m.CustomersModule)
      },
    ],
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'auth',
    title: 'Auth',
    loadComponent: () => import('./core/auth/auth.component').then(c => c.AuthComponent),
    canActivate: [GuestGuard],
  },
  {path: 'not-found', title: 'Not Found', component: NotfoundComponent},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
