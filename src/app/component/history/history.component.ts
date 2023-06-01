import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VideoDto} from "../../dto/video-dto";
import {VideoService} from "../../service/video.service";
import {Subject} from "rxjs";
import {throttleTime} from "rxjs/operators";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @ViewChild('historyContainer') videoContainer!: ElementRef;
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
    this.videoService.getHistoryPage(this.page, this.pageSize).subscribe(videoPage => {
      if (videoPage.videos.length !== 0) {
        this.videos.push(...videoPage.videos);
        this.page++;
        this.loading = false;
      }
    });
  }

}
