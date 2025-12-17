import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  isOpen = signal(true);

  onToggleSidebar() {
    this.isOpen.update((o) => !o)
  }
}
