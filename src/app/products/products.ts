import {AfterViewInit, Component, ElementRef, inject, OnInit, signal, viewChild} from '@angular/core';
import {CartService} from '../cart/cart.service';
import {ProductsService} from './products.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, AfterViewInit {
  cartService = inject(CartService);
  productsService = inject(ProductsService);
  trigger = viewChild<ElementRef>('loadMoreTrigger')
  isAdmin = signal(false)
  cartCount = this.cartService.getCount();

  ngOnInit() {
    this.productsService.getProductCount().subscribe()
    this.productsService.getProducts().subscribe()
    this.productsService.isAdmin().subscribe(isAdmin => {
      this.isAdmin.set(isAdmin)
    })
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting)
        this.productsService.loadMoreProducts();
    });
    observer.observe(this.trigger()?.nativeElement);
  }
}
