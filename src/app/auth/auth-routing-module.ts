import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Auth} from './auth';


const routes: Routes = [
  {path: '', title: "Auth", component: Auth},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
