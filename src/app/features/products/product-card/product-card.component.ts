import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild
} from '@angular/core';
import {CartService} from '../../../core/services/cart.service';
import {ProductsService} from '../products.service';
import {ToastService} from '../../../core/services/toast.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  standalone: false,
})
export class ProductCardComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  cartService = inject(CartService);
  productsService = inject(ProductsService);
  toastService = inject(ToastService);
  trigger = viewChild<ElementRef>('loadMoreTrigger');
  isAdmin = signal(false);
  cartCount = signal(this.cartService.count());
  products = this.productsService.products;

  ngOnInit() {
    this.productsService.getProductCount().subscribe();
    this.productsService.getProducts().subscribe(() => setTimeout(() => this.checkIfNeedsMoreProducts(), 100));
    this.productsService.isAdmin().subscribe((isAdmin) => this.isAdmin.set(isAdmin));
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) this.productsService.loadMoreProducts();
    }, {rootMargin: '0px 0px 40% 0px'});
    observer.observe(this.trigger()?.nativeElement);
  }

  ngAfterViewChecked() {
    this.cartCount.set(this.cartService.count());
  }

  addToCart(product: any) {
    const item = {
      id: product.id,
      thumbnail: product.thumbnail,
      title: product.title,
      price: product.price,
      quantity: 1,
      stock: product.stock,
    };

    this.cartService.addToCart(item).then((added) => {
      if (added) {
        this.cartCount.set(this.cartService.count());
        this.toastService.show('success', 'Successfully Added To Cart');
      } else this.toastService.show('danger', 'No Stock');
    });
  }

  checkIfNeedsMoreProducts() {
    let triggerTop = (this.trigger()?.nativeElement.getBoundingClientRect().top * 40) / 100
    if (triggerTop < window.innerHeight) this.productsService.loadMoreProducts();
  }

  ngOnDestroy() {
    this.productsService.reset();
  }
}
