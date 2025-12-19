import {Component, inject, output} from '@angular/core';
import {UserInfoComponent} from '../user-info/user-info';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  imports: [UserInfoComponent]
})
export class HeaderComponent {
  toggleSidebar = output()
  router = inject(Router);

  isPathIncludesAdmin() {
    return !this.router.url.includes('admin')
  }

  onToggleSidebar() {
    this.toggleSidebar.emit()
  }
}
