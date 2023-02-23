import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private matSnackBar: MatSnackBar, private authService: AuthService, private router: Router) {

  }

  hidePassword = true;

  registrationForm = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30),
      Validators.pattern('[A-Za-z0-9]+'),
    ])),
    name: this.builder.control('', Validators.compose([Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern('[A-Za-zА-Яа-я]+'),
    ])),
    surname: this.builder.control('', Validators.compose([Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern('[A-Za-zА-Яа-я]+'),
    ])),
    password: this.builder.control('', Validators.compose([Validators.required,
      // Validators.pattern('/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/')
      Validators.minLength(4),
      Validators.maxLength(30),
      Validators.pattern("\\S*")
    ])),
  });

  proceedRegistration() {
    if (this.registrationForm.valid) {
      this.authService.registerUser(this.registrationForm.value).subscribe(result => {
        this.matSnackBar.open('Вы успешно зарегистрировались!', 'Ок', {duration: 3000});
        this.router.navigate(['login'])
      });
    } else {
      this.matSnackBar.open('Пожалуйста, правильно заполните форму регистрации!', 'Ладно', {
        duration: 3000,
      });
    }
  }
}
