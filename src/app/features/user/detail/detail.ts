import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '@services/user.service';
import { map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'detail-user',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailModule {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  user$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) =>
      this.userService.getUsers().pipe(
        map((users) => users.find((u) => u.id === id))
      ),
    ),
  );
}
