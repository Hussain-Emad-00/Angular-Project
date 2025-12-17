import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Admin} from './admin';
import {AdminProducts} from './products/products';
import {Customers} from './customers/customers';
import {CustomerDetails} from './customer-details/customer-details';

const routes: Routes = [
  {
    path: '', component: Admin, children: [
      {path: '', redirectTo: 'customers', pathMatch: 'full'},
      {path: 'customers', title: "Customers", component: Customers},
      {path: 'customers/:id', title: "Customer Details", component: CustomerDetails},
      {path: 'products', title: "Products", component: AdminProducts}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
