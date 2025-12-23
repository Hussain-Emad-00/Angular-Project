import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: { message: string, classes: string }[] = [];

  add(message: string, classes: string) {
    this.toasts.push({message, classes});
  }

  remove(index: number) {
    this.toasts.splice(index, 1);
  }
}
