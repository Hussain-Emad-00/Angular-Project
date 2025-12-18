import {Injectable} from '@angular/core';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  show(classBgColor: string, content: string) {
    const toastLiveElement = document.getElementById('liveToast')
    const toastBody = document.getElementById('toast-body')
    toastBody!.textContent = content;

    if (classBgColor.includes('danger')) {
      toastLiveElement?.classList.remove('text-bg-success');
      toastLiveElement?.classList.add('text-bg-danger');
    } else if (classBgColor.includes('success')) {
      toastLiveElement?.classList.remove('text-bg-danger');
      toastLiveElement?.classList.add('text-bg-success');
    }

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveElement)
    toastBootstrap.show()
  }
}
