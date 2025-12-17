import {Component, input, OnChanges, output, signal, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {Customer} from '../../../shared/customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
  imports: [FormsModule, ReactiveFormsModule]
})
export class CustomerForm implements OnChanges {
  newCustomerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl(12, [Validators.required, Validators.min(12)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
  })
  invalidInputs = signal<string[]>([])
  selectedCustomer = input<Customer>()
  submitCustomer = output<any>()

  ngOnChanges(changes: SimpleChanges) {
    if (!this.selectedCustomer()) {
      this.newCustomerForm.reset();
      return;
    }
    if (changes['selectedCustomer'] && this.selectedCustomer()) {
      this.newCustomerForm.patchValue({
        firstName: this.selectedCustomer()?.firstName,
        lastName: this.selectedCustomer()?.lastName,
        age: this.selectedCustomer()?.age,
        email: this.selectedCustomer()?.email,
        phone: this.selectedCustomer()?.phone,
      });
    }
  }

  onSubmitNewCustomer() {
    if (this.newCustomerForm.valid) {
      this.submitCustomer.emit({
        ...this.newCustomerForm.value,
        action: this.selectedCustomer() ? 'update' : 'add',
        id: this.selectedCustomer()?.id
      });
      this.newCustomerForm.reset();
    } else {
      this.invalidInputs.set([])
      let controls = this.newCustomerForm.controls
      for (const key in controls) {
        const control = controls[key as keyof typeof controls];
        if (control.invalid) {
          this.invalidInputs.update((old) => [...old, key])
        }
      }
    }
  }
}
