import { Component } from '@angular/core';
import {UserService} from "../service/user.service";
import {VideoDto} from "../dto/video-dto";
import {UserDto} from "../dto/user-dto";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {

  users: Array<UserDto> = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getSubscriptions().subscribe(response => {
      this.users = response;
    })
  }
}
