import {AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../../cart/cart.service';
import {ProductCardService} from './product-card.service';
import {ToastService} from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  standalone: false,
})
export class ProductCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('loadMoreTrigger') trigger!: ElementRef;
  cartService = inject(CartService);
  productsService = inject(ProductCardService);
  toastService = inject(ToastService);
  products = this.productsService.products.asReadonly();

  ngOnInit() {
    this.productsService.getProducts().subscribe(() => setTimeout(() => this.checkIfNeedsMoreProducts(), 200));
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) this.productsService.loadMoreProducts();
    }, {rootMargin: '0px 0px 40% 0px'});
    observer.observe(this.trigger.nativeElement);
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
      if (added) this.toastService.add('Successfully Added To Cart', 'text-bg-success')
      else this.toastService.add('No Stock', 'text-bg-danger')
    });
  }

  checkIfNeedsMoreProducts() {
    let triggerTop = (this.trigger.nativeElement.getBoundingClientRect().top * 40) / 100
    if (triggerTop < window.innerHeight) this.productsService.loadMoreProducts();
  }

  ngOnDestroy() {
    this.productsService.reset();
  }
}
