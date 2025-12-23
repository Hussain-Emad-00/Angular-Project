import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {ProductService} from './product.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../shared/components/toast/toast.service';

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
  toastService = inject(ToastService);
  productService = inject(ProductService);
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
      if (added) this.toastService.add('Successfully Added To Cart', 'text-bg-success')
      else this.toastService.add('No Stock', 'text-bg-danger')
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
