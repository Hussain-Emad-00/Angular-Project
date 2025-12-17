import {Injectable} from '@angular/core';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  show() {
    const toastLiveElement = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveElement)

    toastBootstrap.show()
  }
}
