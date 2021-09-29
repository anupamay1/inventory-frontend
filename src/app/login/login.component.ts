import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthenticationService} from '../services/authentication-service.service';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;
  user: User = new User('','');


  constructor(private authenticationService: AuthenticationService,
    private router: Router,private _snackBar: MatSnackBar, public dialog: MatDialog) {

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
          },
          error =>{
            console.log(error);
            this.router.navigate(['/login']);
            this._snackBar.open('Invalid username and password !!', ' ', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
            panelClass: ['snackbar']
          });
          });

  }

  signUp(){
    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          id: 1,
          title: 'Sign Up'
      };

        const dialogRef = this.dialog.open(SignUpComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => {
              console.log("Dialog output:", data);
              this.user = data;
              console.log("user",this.user);
             if(data!=undefined){
              this.authenticationService.saveUser(this.user).subscribe(
                data => {
                  this.authenticationService.login(data).subscribe(
                    data => {
                      console.log("Welcome user"+data);
                      sessionStorage.setItem('currentUser', data);
                      this.router.navigate(['/products']);
                    }
                  )
                },
                error=>{
                  console.log(error);
                  this.router.navigate(['/login']);
                  this._snackBar.open('User Already exists !!', ' ', {
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                  duration: this.durationInSeconds * 1000,
                  panelClass: ['snackbar']
                   });
                }
              );
             }
            }
        );
  }
}
