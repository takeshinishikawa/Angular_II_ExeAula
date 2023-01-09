import { NotFoundComponent } from './users/components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CreateUsersComponent } from './users/components/create-user/create-user.component';
import { ListComponent } from './users/components/list/list.component';
import ProductsComponent from './products/products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ListProductsComponent } from './products/list-products/list-products.component';

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
        path: 'edit/:id',
        component: CreateUsersComponent,
      },
      {
        path: '',
        component: ListComponent,
      }
    ],

  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: 'create-products',
        component: CreateProductComponent,
      },
      {
        path: 'edit/:id',
        component: CreateProductComponent,
      },
      {
        path: '',
        component: ListProductsComponent,
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
