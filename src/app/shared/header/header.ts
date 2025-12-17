import {Component, output} from '@angular/core';
import {UserInfoComponent} from '../user-info/user-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  imports: [UserInfoComponent]
})
export class HeaderComponent {
  toggleSidebar = output()

  onToggleSidebar() {
    this.toggleSidebar.emit()
  }
}
