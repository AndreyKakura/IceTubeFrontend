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

  constructor(private videoService: VideoService, private activatedRoute: ActivatedRoute, userService: UserService) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    userService.getById(this.userId).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.videoService.getPublishedByUserVideos(this.userId).subscribe(response => {
      this.videos = response;
    })
  }
}
