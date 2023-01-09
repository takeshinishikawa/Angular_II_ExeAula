import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public productForm!: FormGroup;
  public product!: Product;
  public productId!: string;

  ngOnInit() {
    this.buildForm();
    this.getRouteParams();
    this.setFormValue();
  }

  private getRouteParams() {
    this.productId = this.activatedRoute.snapshot.params['id'];
  }

  private setFormValue() {
    const product = this.productsService.getProductById(this.productId);
    this.productForm.patchValue(product);
  }

  private buildForm(): void {
    this.productForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      category: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  public onSubmit(): void {
    const product = this.productForm.getRawValue();
    product.id = this.generateUUID();
    this.productsService.saveProduct(product);
    this.productForm.reset();
    this.router.navigate(['/products']);
  }

  public keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  get f() {
    return this.productForm.controls;
  }

  closeForm(): void {
    this.productForm.reset();
  }

  public generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }
}
