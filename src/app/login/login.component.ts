import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'firebase';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin()
      .then(res => {
        this.router.navigate(['/user']);
      })
  }

  tryTwitterLogin() {
    this.authService.doTwitterLogin()
      .then(res => {
        this.router.navigate(['/user']);
      })
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(role => {
        if (role === "UPDATE_PROFILE") {
          this.router.navigate(['/user']);
        } else {
          this.userService.getCurrentUser()
            .then((res) => {
              this.router.navigate(['/dashboard/', res.uid, role]);
            });
        }
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }

  tryLogin(value) {
    this.authService.doLogin(value)
      .then(role => {
        // profile not updated
        if (role === "UPDATE_PROFILE") {
          this.router.navigate(['/user']);
        } else {
          this.userService.getCurrentUser()
            .then((res) => {
              this.router.navigate(['/dashboard/', res.uid, role]);
            });
        }
      }, err => {
        this.errorMessage = err.message;
      });
  }
}
