import {AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, signal, viewChild} from '@angular/core';
import {CartService} from '../cart/cart.service';
import {ProductsService} from './products.service';
import {ToastService} from '../services/toast.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, AfterViewInit, OnDestroy {
  cartService = inject(CartService);
  productsService = inject(ProductsService);
  toastService = inject(ToastService);
  trigger = viewChild<ElementRef>('loadMoreTrigger')
  isAdmin = signal(false)
  cartCount = signal(this.cartService.getCount())
  products = this.productsService.products;

  ngOnInit() {
    this.productsService.getProductCount().subscribe()
    this.productsService.getProducts().subscribe()
    this.productsService.isAdmin().subscribe(isAdmin => this.isAdmin.set(isAdmin))
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting)
        this.productsService.loadMoreProducts();
    });
    observer.observe(this.trigger()?.nativeElement);
  }

  addToCart(product: any) {
    const added = this.cartService.addToCart({
      id: product.id,
      thumbnail: product.thumbnail,
      title: product.title,
      price: product.price,
      quantity: 1,
      stock: product.stock,
    });
    if (added) {
      this.cartCount.set(this.cartService.getCount())
      this.toastService.show("success", "Successfully Added To Cart")
    } else
      this.toastService.show("danger", "No Stock")
  }

  ngOnDestroy() {
    this.productsService.reset()
  }
}
