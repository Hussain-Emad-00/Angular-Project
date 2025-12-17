import {Component, inject, OnInit, signal} from '@angular/core';
import {AuthService} from '../../auth/auth-service';
import {catchError, EMPTY, tap} from 'rxjs';

type User = { name: string | undefined, photoUrl: string | undefined }

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.html',
})
export class UserInfoComponent implements OnInit {
  user = signal<User>({name: '', photoUrl: ''});
  protected authService = inject(AuthService)

  ngOnInit() {
    this.authService.getUser$().pipe(
      tap(user => {
        if (user) this.user.set({name: user.name, photoUrl: user.picture})
      }),
      catchError(error => {
        console.error('Get customers failed', error);
        return EMPTY;
      })
    ).subscribe()
  }

  logout() {
    this.authService.logout()
  }
}
