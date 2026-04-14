import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from '@components/toast/toast';

@Component({
  selector: 'layout',
  imports: [RouterOutlet, ToastComponent],
  template: `
    <div class="layout">
      <router-outlet></router-outlet>
      <custom-toast></custom-toast>
    </div>
  `,
  styles: [
    `
      .layout {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class Layout {}
