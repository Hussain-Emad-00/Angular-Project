import {Component, inject, output} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  toggleSidebar = output();
  router = inject(Router);
  private cartService = inject(CartService);
  cartCount = this.cartService.count;

  isPathIncludesAdmin() {
    return this.router.url.includes('admin');
  }

  isPathIncludesCart() {
    return this.router.url.includes('cart');
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
