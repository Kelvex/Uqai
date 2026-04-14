import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '@environment/environment';
import { User } from '@interfaces/user.interface'
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = environment.API_URL+'/users';
  private http = inject(HttpClient);

  private users$ = this.http.get<User[]>(this.apiUrl).pipe(
    shareReplay(1)
  );

  getUsers(): Observable<User[]> {
    return this.users$;
  }

}
