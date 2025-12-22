import { Injectable } from '@angular/core';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  open(modalId: string) {
    const modalEl = document.getElementById(modalId);
    if (!modalEl) return;

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  close(modalId: string) {
    const modalEl = document.getElementById(modalId);
    if (!modalEl) return;

    const modal = bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }
}
