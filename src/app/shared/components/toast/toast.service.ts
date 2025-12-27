import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<{ message: string, classes: string }[]>([]);

  add(message: string, classes: string) {
    this.toasts.update((o) => [...o, {message, classes}]);
  }

  remove(index: number) {
    this.toasts.update((o) => o.splice(index, 1))
  }
}
