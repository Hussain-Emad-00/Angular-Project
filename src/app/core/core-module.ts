import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {AdminLayout} from './layout/admin-layout/admin-layout';
import {UserLayout} from './layout/user-layout/user-layout';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './layout/header/header.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {UserInfoComponent} from '../shared/components/user-info/user-info.component';
import {AuthModule} from '@auth0/auth0-angular';
import {environment} from '../../environments/environment';
import {authInterceptor} from './interceptors/auth-interceptor';

@NgModule({
  declarations: [
    AdminLayout,
    UserLayout,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    UserInfoComponent,
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin
      },
      cacheLocation: "localstorage",
      useRefreshTokens: true,
    })
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  exports: [
    AdminLayout,
    UserLayout
  ],
})
export class CoreModule {
}
