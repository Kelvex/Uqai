import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '@interfaces/toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private toasts$ = new BehaviorSubject<Toast[]>([]);

  getToasts() {
    return this.toasts$.asObservable();
  }

  show(message: string, type: Toast['type'] = 'info') {
    const toast: Toast = {
      id: Date.now(),
      message,
      type
    };

    const current = this.toasts$.value;
    this.toasts$.next([toast, ...current]);
    setTimeout(() => this.remove(toast.id), 3000);
  }

  remove(id: number) {
    this.toasts$.next(
      this.toasts$.value.filter(t => t.id !== id)
    );
  }

}
