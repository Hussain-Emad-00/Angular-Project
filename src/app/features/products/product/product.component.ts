import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {Location} from '@angular/common';

import {ProductService} from './product.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../shared/components/toast/toast.service';
import {Product as ProductModel} from '../../../shared/models/product.model';
import {CartService} from '../../cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: false,
})
export class ProductComponent implements OnInit {
  @Input({required: true}) id!: string;
  location = inject(Location);
  router = inject(Router);
  toastService = inject(ToastService);
  productService = inject(ProductService);
  cartService = inject(CartService);
  quantity = 1;
  product = signal<ProductModel | null>(null);

  ngOnInit() {
    this.productService.getProduct(+this.id).subscribe((product: any) => {
      this.product.set(product)
    });
  }

  changeImage(img: string) {
    this.product.update((p) => ({...p!, thumbnail: img}));
  }

  addToCart() {
    const product = {
      id: this.product()?.id,
      thumbnail: this.product()?.thumbnail,
      title: this.product()?.title,
      price: this.product()?.price,
      quantity: this.quantity,
      stock: this.product()?.stock,
    };

    this.cartService.addToCart(product).then((added) => {
      if (added) this.toastService.add('Successfully Added To Cart', 'text-bg-success')
      else this.toastService.add('No Stock', 'text-bg-danger')
    });
  }

  incrementQuantity() {
    this.quantity = this.quantity >= this.product()!.stock ? this.quantity : this.quantity + 1;
  }

  decrementQuantity() {
    this.quantity = this.quantity <= 1 ? this.quantity : this.quantity - 1;
  }

  isPathIncludesAdmin() {
    return this.router.url.includes('admin');
  }
}
