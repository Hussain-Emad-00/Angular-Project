import {NgModule, provideBrowserGlobalErrorListeners} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AuthModule} from '@auth0/auth0-angular';

import {AppRoutingModule} from './app-routing-module';
import {App} from './app';
import {AdminModule} from './admin/admin-module';
import {AuthModule as LocalAuthModule} from './auth/auth-module';
import {ProductsModule} from './products/products-module';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    ProductsModule,
    LocalAuthModule,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  exports: [],
  bootstrap: [App]
})
export class AppModule {
}
