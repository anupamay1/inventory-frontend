import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { User } from '../models/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  user: User = new User('','');
  title: String;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<SignUpComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

      this.title = data.title;

     }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
  });
 }
 save() {
  console.log(this.signUpForm.value);

  this.dialogRef.close(this.signUpForm.value);
}

close() {
    this.dialogRef.close();
}

}
