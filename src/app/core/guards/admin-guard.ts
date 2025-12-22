import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth-service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.auth.isAdmin$().pipe(
      map((isAdmin) => {
        if (!isAdmin) this.router.navigate(['/']);
        return isAdmin;
      })
    );
  }
}
