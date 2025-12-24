import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../auth/auth-service';
import {switchMap} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)

  return authService.getToken$().pipe(
    switchMap(token => {
      const authReq = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      })
      return next(authReq);
    })
  )
};
