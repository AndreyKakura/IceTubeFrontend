import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {VideoService} from '../../service/video.service';
import {VideoDto} from '../../dto/video-dto';
import {Subject} from 'rxjs';
import {throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @ViewChild('videoContainer') videoContainer!: ElementRef;
  page = 0;
  pageSize = 12;
  loading = false;
  videos: Array<VideoDto> = [];

  constructor(private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.loadVideos();
  }

  onScroll() {
    if (!this.loading) {
      this.loadVideos();
    }
  }

  loadVideos(): void {
    this.loading = true;
    this.videoService.getVideoPage(this.page, this.pageSize).subscribe(videoPage => {
      if (videoPage.videos.length !== 0) {
        this.videos.push(...videoPage.videos);
        this.page++;
        this.loading = false;
      }
    });
  }



}
