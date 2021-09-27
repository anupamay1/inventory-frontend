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
      console.log("update",this.productData);
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      productId: [{value:this.productData.productId,disabled: true}, Validators.required],
      productName: [this.productData.productName, Validators.required],
      productCategory: [this.productData.productCategory],
      productDescription: [this.productData.productDescription],
      units: [this.productData.units, Validators.required],
  });
  }

  get f() { return this.form.controls; }

  save() {
    console.log(this.form.value);
    this.productData.productCategory = this.f.productCategory.value;
    this.productData.productName = this.f.productName.value;
    this.productData.productDescription = this.f.productDescription.value;
    this.productData.units = this.f.units.value;
    this.dialogRef.close(this.productData);
  }

  close() {
      this.dialogRef.close();
  }
}
