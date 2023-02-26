import { Component } from '@angular/core';
import {VideoDto} from "../dto/video-dto";
import {VideoService} from "../service/video.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrls: ['./liked-videos.component.css']
})
export class LikedVideosComponent {
  videos: Array<VideoDto> = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getLikedVideos().subscribe(response => {
      this.videos = response;
    })
  }
}
