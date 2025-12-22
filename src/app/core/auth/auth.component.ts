import {Component, inject} from '@angular/core';

import {AuthService} from './auth-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  private authService = inject(AuthService);

  login() {
    this.authService.login();
  }

  signup() {
    this.authService.signup();
  }
}
