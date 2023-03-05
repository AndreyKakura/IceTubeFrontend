import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage?: string;

  constructor(private builder: FormBuilder, private matSnackBar: MatSnackBar, private authService: AuthService, private router: Router) {

  }

  hidePassword = true;

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
      Validators.pattern('[A-Za-z0-9]+'),
    ])),

    password: this.builder.control('', Validators.compose([Validators.required,
      // Validators.pattern('/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/')
      Validators.minLength(4),
      Validators.maxLength(30),
      Validators.pattern("\\S*")
    ])),
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value)
        .subscribe(() => {
          this.router.navigate(['']);
        },
          error => {
          this.errorMessage = error;
          })
    }
  }

}
