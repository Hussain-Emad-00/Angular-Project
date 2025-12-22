import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthService} from '../auth/auth-service';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class GuestGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate() {
    return this.auth.isAuthenticated$().pipe(
      map(isLoggedIn => {
        if (isLoggedIn) this.router.navigate(['/products']);
        return true
      })
    )
  }
}
