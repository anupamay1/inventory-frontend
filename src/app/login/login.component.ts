import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthenticationService} from '../services/authentication-service.service';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidUser: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;


  constructor(private authenticationService: AuthenticationService,private router: Router,private _snackBar: MatSnackBar) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
   }

  ngOnInit(): void {
  }
  get f(){
    return this.loginForm.controls;
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
  }
  let user = new User(this.f.username.value,this.f.password.value);

  this.authenticationService.login(user)
      .subscribe(
          data => {
              console.log("Welcome user"+data);
              sessionStorage.setItem('currentUser', data);
              this.router.navigate(['/products']);
              this.submitted = true;
          },
          error =>{
            console.log(error);
            this.invalidUser = true;
           this.router.navigate(['/login']);
           this._snackBar.open('Invalid username and password !!', ' ', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
            panelClass: ['snackbar']
          });
          });

  }
}
