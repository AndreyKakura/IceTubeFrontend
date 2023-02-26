import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {VideoService} from "../service/video.service";
import {VideoDto} from "../dto/video-dto";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: Array<VideoDto> = [];

  constructor(private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.videoService.getAllVideos().subscribe(response => {
      this.videos = response;
    })
  }

}
