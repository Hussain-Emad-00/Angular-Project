import {Component, inject, input, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import {ProductDetailsService} from './product-details.service';
import {ToastService} from '../services/toast.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit, OnDestroy {
  id = input.required<string>()
  location = inject(Location)
  productService = inject(ProductDetailsService)
  toastService = inject(ToastService)
  product = this.productService.product
  quantity = this.productService.quantity

  ngOnInit() {
    this.productService.getProduct(+this.id()).subscribe()
  }

  ngOnDestroy() {
    this.productService.product.set(null)
    this.productService.quantity.set(1)
  }

  changeImage(img: string) {
    this.productService.changeImage(img)
  }

  addToCart() {
    this.productService.addToCart().then(added => {
      if (added)
        this.toastService.show("success", "Successfully Added To Cart")
      else
        this.toastService.show("danger", "No Stock")
    })
  }
}
