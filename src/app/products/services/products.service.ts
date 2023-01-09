import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  public getProducts(): Product[] {
    return JSON.parse(localStorage.getItem('PRODUCTS') || '[]');
  }

  public getProductById(id: string): Product {
    const products = this.getProducts();

    return products.find(product => product.id === id) as Product
  }

  public saveProduct(product: Product): void {
    const products = this.getProducts();

    products.push(product);
    localStorage.setItem('PRODUCTS', JSON.stringify(products));
  }

  public deleteProduct(productId: string): void {
    const products = this.getProducts().filter(item => item.id !== productId);

    localStorage.setItem('PRODUCTS', JSON.stringify(products));
  }
}
