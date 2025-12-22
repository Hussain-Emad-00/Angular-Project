import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthService} from '../auth/auth-service';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate() {
    return this.auth.getUserRole$().pipe(
      map(role => {
        if (role === 'Admin') this.router.navigate(['/admin/customers/list']);
        return true
      })
    )
  }
}
