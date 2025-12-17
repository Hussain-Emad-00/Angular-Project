import {Component, input} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
})
export class Toast {
  content = input.required<string>()
}
