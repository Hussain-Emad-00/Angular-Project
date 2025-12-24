import {Component, inject, OnInit, signal} from '@angular/core';
import {ProductsListService} from './products-list.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductFormComponent} from '../product-form/product-form.component';
import {Product} from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productsService = inject(ProductsListService);
  ngbModalService = inject(NgbModal)
  products = signal<Product[]>([])
  productsCount = 0
  isLoading = true;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.loadProducts().subscribe((res: any) => {
      if (this.productsCount <= 0) this.productsCount = res.total

      this.products.set(res.products)
      this.isLoading = false
    });
  }

  deleteProduct(id: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.productsService.deleteProduct(id).subscribe((res: any) => {
        this.products.update((products) =>
          products.filter((product) => product.id !== id));
      })
    }
  }

  openProductModal(productId?: number) {
    const modalRef = this.ngbModalService.open(ProductFormComponent)
    const product = this.products().find(p => p.id === productId);
    if (product) modalRef.componentInstance.product = product;

    modalRef.result.then(result => this.onProductSubmitted(result), reason => reason)
  }

  onProductSubmitted(product: any) {
    switch (product.action) {
      case 'update':
        this.productsService.updateProduct(product).subscribe((res: any) => {
          this.products.update((products) =>
            products.map((p) => p.id === res.id ? res : p)
          )
        })
        break;
      case 'add':
        this.productsService.addNewProduct(product).subscribe((res: any) => {
          this.products.update((products) => [res, ...products])
        })
        break;
    }
  }

  currentPage(page: number) {
    this.productsService.currentPage(page)
    this.getProducts()
  }

  pageSize(size: number) {
    this.productsService.pageSize(size)
    this.getProducts()
  }
}
