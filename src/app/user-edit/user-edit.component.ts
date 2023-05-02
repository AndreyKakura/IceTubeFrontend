import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../service/user.service";
import {ChangePasswordDto} from "../dto/change-password-dto";
import {catchError, switchMap} from "rxjs/operators";
import {throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  formGroup!: FormGroup;

  hidePassword = true;

  constructor(private formBuilder: FormBuilder, private matSnackBar: MatSnackBar,
              private userService: UserService, private authService: AuthService,
              private router: Router) {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatedPassword: ['', Validators.required]
    });
  }

  changePassword() {
    if (this.formGroup.valid) {
      const oldPassword = this.formGroup.value.oldPassword;
      const newPassword = this.formGroup.value.newPassword;
      const repeatedPassword = this.formGroup.value.repeatedPassword;

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
    }
  }
}
