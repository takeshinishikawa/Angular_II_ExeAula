import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  public products!: Product[];
  public product!: Product;
  constructor(private productsService: ProductsService, private router: Router) {}
  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.products = this.productsService.getProducts();
  }

  public onDelete(productId: string): void {
    this.productsService.deleteProduct(productId);
    this.products = this.productsService.getProducts();
  }

  public editProduct(id: string) {
    console.log(id);
    this.router.navigate(['/products/edit', id]);
  }
}
