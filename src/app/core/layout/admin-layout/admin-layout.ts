import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
  isOpen = signal(false)

  onToggleSidebar() {
    this.isOpen.update(o => !o)
  }
}
