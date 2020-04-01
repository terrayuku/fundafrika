import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { UserService } from '../core/user.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin()
      .then(res => {
        this.router.navigate(['/user']);
      }, err => console.log(err)
      )
  }

  tryTwitterLogin() {
    this.authService.doTwitterLogin()
      .then(res => {
        this.router.navigate(['/user']);
      }, err => console.log(err)
      )
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
      }, err => console.log(err)
      )
  }

  tryRegister(value) {
    this.authService.doRegister(value)
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
        this.successMessage = "";
      })
  }

}
