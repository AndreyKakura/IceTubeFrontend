import {Component} from '@angular/core';
import {UserService} from "../service/user.service";
import {VideoDto} from "../dto/video-dto";
import {UserDto} from "../dto/user-dto";
import {VideoService} from "../service/video.service";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {

  users: Array<UserDto> = [];

  videos: Array<VideoDto> = [];

  constructor(private userService: UserService, private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.userService.getSubscriptions().subscribe(response => {
      this.users = response;
    });

    this.videoService.getSubscribedVideos().subscribe(videos => {
      this.videos = videos;
    })
  }
}
