import { Component, inject } from '@angular/core';
import { ToastService } from '@shared-services/toast.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'custom-toast',
  imports: [AsyncPipe, NgClass],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class ToastComponent {
  private toastService = inject(ToastService);

  toasts$ = this.toastService.getToasts();

  remove(id: number) {
    this.toastService.remove(id);
  }
}
