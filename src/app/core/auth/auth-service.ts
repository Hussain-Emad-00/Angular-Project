import {inject, Injectable} from '@angular/core';
import {AuthService as Auth0Service} from '@auth0/auth0-angular';
import {map} from 'rxjs/operators';
import {db} from '../services/db.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private namespace = 'https://angular-practice-project';
  private auth0 = inject(Auth0Service);

  login() {
    this.auth0.loginWithRedirect();
  }

  signup() {
    this.auth0.loginWithRedirect({authorizationParams: {screen_hint: 'signup'}});
  }

  logout() {
    this.auth0.logout({logoutParams: {returnTo: window.location.origin}});
    this.clearIndexedDb().then();
  }

  getUser$() {
    return this.auth0.user$;
  }

  isAuthenticated$() {
    return this.auth0.isAuthenticated$
  }

  getUserRole$() {
    return this.auth0.user$.pipe(
      map((user) => {
        const roles = user?.[this.namespace + '/roles'];
        if (roles?.includes('Admin')) return 'Admin';
        if (roles?.includes('User')) return 'User';
        return null;
      })
    );
  }

  isAdmin$() {
    return this.getUserRole$().pipe(map((role) => role === 'Admin'));
  }

  async clearIndexedDb() {
    await db.cartItems.clear();
  }
}
