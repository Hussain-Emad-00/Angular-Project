import {Component, inject, OnInit, signal} from '@angular/core';
import {catchError, EMPTY, tap} from 'rxjs';
import {AuthService} from '../../../core/auth/auth-service';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';

type User = { name: string | undefined; photoUrl: string | undefined };

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  imports: [NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbDropdown]
})
export class UserInfoComponent implements OnInit {
  user = signal<User>({name: '', photoUrl: ''});
  protected authService = inject(AuthService);

  ngOnInit() {
    this.authService
      .getUser$()
      .pipe(
        tap((user) => {
          if (user) this.user.set({name: user.name, photoUrl: user.picture})
        }),
        catchError((error) => {
          console.error('Get User Info Failed', error);
          return EMPTY;
        })
      )
      .subscribe();
  }

  logout() {
    this.authService.logout();
  }
}
