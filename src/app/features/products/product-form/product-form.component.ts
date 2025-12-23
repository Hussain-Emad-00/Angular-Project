import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  standalone: false,
})
export class ProductFormComponent implements OnInit {
  @Input() product: any
  ngbActiveModal = inject(NgbActiveModal);
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    thumbnail: new FormControl(''),
    price: new FormControl(1, [Validators.required, Validators.min(1)]),
    stock: new FormControl(1, [Validators.required, Validators.min(1)]),
  });
  imagePreview = '';

  ngOnInit() {
    if (this.product) {
      this.productForm.patchValue(this.product)
      this.imagePreview = (this.product.thumbnail);
    }
  }

  save() {
    if (this.productForm.valid) {
      this.productForm.controls.thumbnail.patchValue(this.imagePreview)
      this.ngbActiveModal.close(
        this.product
          ? {...this.productForm.value, action: 'update', id: this.product.id}
          : {...this.productForm.value, action: 'add'}
      )
    } else this.productForm.markAllAsDirty()
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target?.result as string;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;

        ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.1);

        this.imagePreview = (compressedDataUrl);
      }
    };
    reader.readAsDataURL(file);
  }
}
