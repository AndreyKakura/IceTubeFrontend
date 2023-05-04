import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../service/user.service";
import {ChangePasswordDto} from "../dto/change-password-dto";
import {catchError, switchMap} from "rxjs/operators";
import {throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {ChangeNameAndSurnameDto} from "../dto/change-name-and-surname-dto";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  changePasswordFormGroup!: FormGroup;

  changeNameAndSurnameFormGroup!: FormGroup;

  hidePassword = true;

  hidePassword2 = true;

  constructor(private formBuilder: FormBuilder, private matSnackBar: MatSnackBar,
              private userService: UserService, private authService: AuthService,
              private router: Router) {
    this.createForms();
  }

  createForms() {
    this.changePasswordFormGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.compose([Validators.required,
        // Validators.pattern('/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/')
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern("\\S*")
      ])],
      repeatedPassword: ['', Validators.compose([Validators.required,
        // Validators.pattern('/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/')
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern("\\S*")
      ])]
    });
    this.changeNameAndSurnameFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern('[A-Za-z0-9]+'),
      ])],
      surname: ['', Validators.compose([Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern('[A-Za-z0-9]+'),
      ])],
      password: ['', Validators.required]
    });
  }

  changePassword() {
    if (this.changePasswordFormGroup.valid) {
      const oldPassword = this.changePasswordFormGroup.value.oldPassword;
      const newPassword = this.changePasswordFormGroup.value.newPassword;
      const repeatedPassword = this.changePasswordFormGroup.value.repeatedPassword;

      if (oldPassword == newPassword) {
        this.matSnackBar.open('Старый и новый пароли совпадают', 'Ок', {duration: 3000});
      } else if (newPassword === repeatedPassword) {
        const changePasswordDto: ChangePasswordDto = {
          oldPassword: oldPassword,
          newPassword: newPassword
        }
        this.userService.changePassword(changePasswordDto).subscribe(() => {
            this.matSnackBar.open('Пароль изменен', 'Замечательно', {duration: 3000});
            this.authService.logout();
          },
          error => {
            this.matSnackBar.open('Старый пароль указан неверно', 'Ладно', {duration: 3000});
          })
      } else {
        this.matSnackBar.open('Пароли не совпадают!', 'Ок', {duration: 3000});
      }
    } else {
      this.matSnackBar.open('Пожалуйста, правильно заполните форму', 'Ладно', {
        duration: 3000,
      });
    }
  }

  changeNameAndSurname() {
    if (this.changeNameAndSurnameFormGroup.valid) {
      const name = this.changeNameAndSurnameFormGroup.value.name;
      const surname = this.changeNameAndSurnameFormGroup.value.surname;
      const password = this.changeNameAndSurnameFormGroup.value.password;

      const changeNameAndSurnameDto: ChangeNameAndSurnameDto = {
        name: name,
        surname: surname,
        password: password
      }
      this.userService.changeNameAndSurname(changeNameAndSurnameDto).subscribe(() => {
          this.matSnackBar.open('Имя и фамилия изменены', 'Замечательно', {duration: 3000});
          this.router.navigate(['user']);
        },
        error => {
          this.matSnackBar.open('Пароль указан неверно', 'Ладно', {duration: 3000});
        })
    } else {
      this.matSnackBar.open('Пожалуйста, правильно заполните форму', 'Ладно', {
        duration: 3000,
      });
    }
  }
}
