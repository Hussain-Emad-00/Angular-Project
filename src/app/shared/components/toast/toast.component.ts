import {Component, inject} from '@angular/core';
import {ToastService} from './toast.service';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  imports: [NgbToastModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  toastService = inject(ToastService);
}
