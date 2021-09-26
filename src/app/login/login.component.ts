import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthenticationService} from '../services/authentication-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted:boolean = false;
  constructor(private authenticationService: AuthenticationService,private router: Router) {
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
              this.submitted = true;
          });
  this.router.navigate(['/products']);
  }
}
