import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Product } from '../models/Product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  form: FormGroup;
  productData:Product;
  product:Product = new Product(0,'','','','',0);
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.productData = data.product;
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      productId: [this.productData.productId, Validators.required],
      productName: [this.productData.productName, Validators.required],
      productCategory: [this.productData.productCategory, Validators.required],
      productDescription: [this.productData.productDescription, Validators.required],
      units: [this.productData.units, Validators.required],
  });
  }
  save() {
    console.log(this.form.value);

    this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
