import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../service/user.service";
import {VideoDto} from "../dto/video-dto";
import {UserDto} from "../dto/user-dto";
import {VideoService} from "../service/video.service";
import {Subject} from "rxjs";
import {throttleTime} from "rxjs/operators";

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  @ViewChild('subscriptionVideosContainer') videoContainer!: ElementRef;
  page = 0;
  pageSize = 12;
  loading = false;
  private scrollSubject = new Subject();

  users: Array<UserDto> = [];

  videos: Array<VideoDto> = [];

  constructor(private userService: UserService, private videoService: VideoService) {
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
    this.videoService.getSubscribedVideos(this.page, this.pageSize).subscribe(videoPage => {
      if (videoPage.videos.length !== 0) {
        this.videos.push(...videoPage.videos);
        this.page++;
        this.loading = false;
      }
    });
  }

}
