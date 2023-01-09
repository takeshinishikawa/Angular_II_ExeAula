import { ListProductsComponent } from './products/list-products/list-products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import ProductsComponent from './products/products.component';
import { ListComponent } from './users/components/list/list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUsersComponent } from './users/components/create-user/create-user.component';
import { NotFoundComponent } from './users/components/not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


const material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CreateUsersComponent,
    NotFoundComponent,
    ListComponent,
    ProductsComponent,
    CreateProductComponent,
    ListProductsComponent
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    material,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class AppModule {}
