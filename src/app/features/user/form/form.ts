import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { delay, of } from 'rxjs';
import { ToastService} from '@shared-services/toast.service';

@Component({
  selector: 'user-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {

  @Output() userCreated = new EventEmitter<any>();

  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    birthDate: [''],
    age: [{ value: '', disabled: true }]
  });

  loading = false;

  ngOnInit() {
    this.listenBirthDateChanges();
  }

  private listenBirthDateChanges() {
    this.form.get('birthDate')?.valueChanges.subscribe(date => {
      if (!date) return;

      const age: string = this.calculateAge(date);
      this.form.get('age')?.setValue(age);
    });
  }

  private calculateAge(date: string): string {
    const birth = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age.toString();
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;

    const user = this.form.getRawValue();

    of(user).pipe(delay(1500)).subscribe(() => {
      this.loading = false;
      this.toastService.show('Guardado exitoso', 'success');
      this.userCreated.emit(user);
      this.form.reset();
    });
  }

}
