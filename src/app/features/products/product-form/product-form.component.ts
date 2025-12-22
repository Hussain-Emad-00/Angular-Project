import {Component, input, OnChanges, output, signal, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  standalone: false,
})
export class ProductFormComponent implements OnChanges {
  imagePreview = signal<string | null>(null);
  newProductForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    thumbnail: new FormControl('', [Validators.required]),
    price: new FormControl(1, [Validators.required, Validators.min(1)]),
    stock: new FormControl(1, [Validators.required, Validators.min(1)]),
  });
  invalidInputs = signal<string[]>([]);
  selectedProduct = input<Product>();
  submitProduct = output<any>();

  ngOnChanges(changes: SimpleChanges) {
    if (!this.selectedProduct()) {
      this.newProductForm.reset();
      return;
    }
    if (changes['selectedProduct'] && this.selectedProduct()) {
      this.newProductForm.patchValue({
        title: this.selectedProduct()?.title,
        description: this.selectedProduct()?.description,
        price: this.selectedProduct()?.price,
        stock: this.selectedProduct()?.stock,
        thumbnail: this.selectedProduct()?.images[0],
      });
      this.imagePreview.set(this.selectedProduct()?.images[0] || null);
    }
  }

  onSubmitNewProduct() {
    if (this.newProductForm.valid) {
      this.submitProduct.emit({
        ...this.newProductForm.value,
        id: this.selectedProduct()?.id,
        action: this.selectedProduct() ? 'update' : 'add',
      });
      this.newProductForm.reset();
      this.imagePreview.set(null);
    } else {
      this.invalidInputs.set([]);
      let controls = this.newProductForm.controls;
      for (const key in controls) {
        const control = controls[key as keyof typeof controls];
        if (control.invalid) {
          this.invalidInputs.update((old) => [...old, key]);
        }
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      this.newProductForm.patchValue({thumbnail: base64});
      this.newProductForm.get('thumbnail')?.updateValueAndValidity();

      this.imagePreview.set(base64);
    };
    reader.readAsDataURL(file);
  }
}
