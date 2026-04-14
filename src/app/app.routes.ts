import { Routes } from '@angular/router';
import { UserModule } from './features/user/user';
import { DetailModule } from './features/user/detail/detail';

export const routes: Routes = [
  {path:'', component: UserModule},
  {path:'users/:id', component: DetailModule},
];
