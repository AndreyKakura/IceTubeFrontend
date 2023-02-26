import { Component } from '@angular/core';
import {VideoDto} from "../dto/video-dto";
import {VideoService} from "../service/video.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  videos: Array<VideoDto> = [];

  constructor(private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.videoService.getHistory().subscribe(response => {
      this.videos = response;
    })
  }
}
