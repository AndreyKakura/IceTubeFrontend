import {Component, Input} from '@angular/core';
import {UserDto} from "../../dto/user-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input()
  user!: UserDto;

  constructor(private router : Router) {
  }

  ngOnInit(): void {

  }

  navigateToPublishedVideos() {
    this.router.navigate(['/video/publishedby', this.user.id], { state: { user: this.user } });
  }
}
