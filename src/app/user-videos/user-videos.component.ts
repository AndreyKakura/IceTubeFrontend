import {Component} from '@angular/core';
import {VideoDto} from "../dto/video-dto";
import {UserService} from "../service/user.service";
import {VideoService} from "../service/video.service";
import {ActivatedRoute} from "@angular/router";
import {UserDto} from "../dto/user-dto";

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.component.html',
  styleUrls: ['./user-videos.component.css']
})
export class UserVideosComponent {

  userId!: number;

  user!: UserDto;

  videos: Array<VideoDto> = [];

  isSubscribed?: boolean;

  constructor(private videoService: VideoService, private activatedRoute: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.userService.getById(this.userId).subscribe(user => {
      this.user = user;
      this.isSubscribed = user.isSubscribed;
    });
    this.videoService.getPublishedByUserVideos(this.userId).subscribe(response => {
      this.videos = response;
    })
  }

  subscribe() {
    this.userService.subscribe(this.user.id).subscribe(isSubscribed => {
      this.isSubscribed = isSubscribed;
    })

  }

  unsubscribe() {
    this.userService.unsubscribe(this.user.id).subscribe(isSubscribed => {
      this.isSubscribed = isSubscribed;
    })
  }

  getUserId() : number {
    return this.userService.getUserId();
  }

}
