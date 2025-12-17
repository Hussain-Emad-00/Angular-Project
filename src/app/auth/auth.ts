import {Component, inject} from '@angular/core';

import {AuthService} from './auth-service';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.html',
})
export class Auth {
  private authService = inject(AuthService);

  login() {
    this.authService.login()
  }

  signup() {
    this.authService.signup()
  }
}
