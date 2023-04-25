import { Component } from '@angular/core';
import {UserService} from "../service/user.service";
import {UserDto} from "../dto/user-dto";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  currentUser?: UserDto;
  constructor(private userService: UserService, private authService: AuthService) {
    this.userService.getCurrent().subscribe(user => {
      this.currentUser = user;
    })
  }

  proceedLogout() {
    this.authService.logout();
  }
}
