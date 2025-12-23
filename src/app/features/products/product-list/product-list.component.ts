import {Component, inject, OnInit} from '@angular/core';
import {ProductsListService} from './products-list.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductFormComponent} from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productsService = inject(ProductsListService);
  products = this.productsService.products;
  loading = this.productsService.loading;
  ngbModalService = inject(NgbModal)

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.loadProducts().subscribe();
  }

  deleteProduct(id: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.productsService.deleteProduct(id).subscribe()
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
        this.productsService.updateProduct(product).subscribe()
        break;
      case 'add':
        this.productsService.addNewProduct(product).subscribe()
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
