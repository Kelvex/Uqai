import { Component, inject } from '@angular/core';
import { UserService } from '@services/user.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { User } from '@interfaces/user.interface';
import { AsyncPipe } from '@angular/common';
import { Form } from './form/form';
import { Router } from '@angular/router';

@Component({
  selector: 'user-module',
  imports: [AsyncPipe, Form],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserModule {
  showModal = false;

  private router = inject(Router);
  private userService = inject(UserService);

  private usersApi$: Observable<User[]> = this.userService.getUsers();
  private newUsers$ = new BehaviorSubject<User[]>([]);
  private search$ = new BehaviorSubject<string>('');

  users$ = combineLatest([
    this.usersApi$,
    this.newUsers$,
    this.search$
  ]).pipe(
    map(([apiUsers, newUsers, search]) => {

      const allUsers = [...newUsers, ...apiUsers];

      if (!search) return allUsers;

      const term = search.toLowerCase();

      return allUsers.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term)
      );
    })
  );

  onSearch(value: string) {
    this.search$.next(value);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addUser(user: any) {
    const newUser: User = {
      id: Date.now(),
      name: user.name,
      username: user.name,
      email: user.email,
      address: { city: 'N/A' } as any,
      company: { name: user.company } as any,
      phone: 'N/A',
      website: 'N/A',
    };

    this.newUsers$.next([newUser, ...this.newUsers$.value]);

    this.closeModal();
  }

  goToDetail(user: User) {
    this.router.navigate(['/users', user.id]);
  }
}
