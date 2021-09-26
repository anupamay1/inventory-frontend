import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Product } from '../models/Product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
    form: FormGroup;
    description:string;
    product:Product = new Product(0,'','','','',0);
    constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<AddProductComponent>,
      @Inject(MAT_DIALOG_DATA) data) {

      this.description = data.title;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      productId: [this.product.productId, Validators.required],
      productName: [this.product.productName, Validators.required],
      productCategory: [this.product.productCategory, Validators.required],
      productDescription: [this.product.productDescription, Validators.required],
      units: [this.product.units, Validators.required],
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
