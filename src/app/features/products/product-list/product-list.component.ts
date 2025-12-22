import {Component, inject, OnInit, signal} from '@angular/core';
import {ModalService} from '../../../core/services/modal.service';
import {Product} from '../../../shared/models/product.model';
import {ProductsListService} from './products-list.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  productsService = inject(ProductsListService);
  modalService = inject(ModalService);
  selectedProduct = signal<Product | null>(null);
  products = this.productsService.products;
  loading = this.productsService.loading;

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

  editProduct(id: number) {
    this.selectedProduct.set(this.products().find((p) => p.id == id) || null)
    this.modalService.open('addNewProductModal')
  }

  addNewProduct() {
    this.selectedProduct.set(null)
    this.modalService.open('addNewProductModal')
  }

  onProductSubmitted(product: any) {
    switch (product.action) {
      case 'update':
        this.productsService.updateProduct(product).subscribe(res => {
          this.modalService.close('addNewProductModal')
        })
        break;
      case 'add':
        this.productsService.addNewProduct(product).subscribe(res => {
          this.modalService.close('addNewProductModal')
        })
        this.selectedProduct.set(null)
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
