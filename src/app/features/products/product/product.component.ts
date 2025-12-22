import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {ProductService} from './product.service';
import {ToastService} from '../../../core/services/toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: false,
})
export class ProductComponent implements OnInit, OnDestroy {
  id = input.required<string>();
  location = inject(Location);
  router = inject(Router);
  productService = inject(ProductService);
  toastService = inject(ToastService);
  product = this.productService.product;
  quantity = this.productService.quantity;

  ngOnInit() {
    this.productService.getProduct(+this.id()).subscribe();
  }

  ngOnDestroy() {
    this.productService.product.set(null);
    this.productService.quantity.set(1);
  }

  changeImage(img: string) {
    this.productService.changeImage(img);
  }

  addToCart() {
    this.productService.addToCart().then((added) => {
      if (added) this.toastService.show('success', 'Successfully Added To Cart');
      else this.toastService.show('danger', 'No Stock');
    });
  }

  incrementQuantity() {
    this.quantity.update((q) => (q >= this.product()!.stock ? q : q + 1));
  }

  decrementQuantity() {
    this.quantity.update((q) => (q <= 1 ? q : q - 1));
  }

  isPathIncludesAdmin() {
    return this.router.url.includes('admin');
  }
}
