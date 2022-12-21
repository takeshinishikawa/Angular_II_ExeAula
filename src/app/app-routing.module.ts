import { NotFoundComponent } from './users/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CreateUsersComponent } from './users/components/create-user/create-user.component';
import { ListComponent } from './users/components/list/list.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: 'create-users',
        component: CreateUsersComponent,
      },
      {
        path: '',
        component: ListComponent,
      }
    ],
  },
  //{ path: 'create-users', component: CreateUsersComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
