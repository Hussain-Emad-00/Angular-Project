import {Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators,} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
  standalone: false,
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: any
  ngbActiveModal = inject(NgbActiveModal);
  customerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl(1, [Validators.required, Validators.min(1)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125]\d{8}$/),
      Validators.minLength(11),
      Validators.maxLength(11)
    ]),
  });

  ngOnInit() {
    if (this.customer) this.customerForm.patchValue(this.customer)
  }

  save() {
    if (this.customerForm.valid) this.ngbActiveModal.close(
      this.customer
        ? {...this.customerForm.value, action: 'update', id: this.customer.id}
        : {...this.customerForm.value, action: 'add'})
    else this.customerForm.markAllAsDirty()
  }
}
