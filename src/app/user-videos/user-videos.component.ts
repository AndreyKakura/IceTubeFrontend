import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VideoDto} from "../dto/video-dto";
import {UserService} from "../service/user.service";
import {VideoService} from "../service/video.service";
import {ActivatedRoute} from "@angular/router";
import {UserDto} from "../dto/user-dto";
import {Subject} from "rxjs";
import {throttleTime} from "rxjs/operators";

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.component.html',
  styleUrls: ['./user-videos.component.css']
})
export class UserVideosComponent implements OnInit {

  @ViewChild('userVideosContainer') videoContainer!: ElementRef;
  page = 0;
  pageSize = 12;
  loading = false;

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
    this.loadVideos();
  }

  onScroll() {
    if (!this.loading) {
      this.loadVideos();
    }
  }


  loadVideos(): void {
    this.loading = true;
    this.videoService.getPublishedByUserVideosPage(this.userId, this.page, this.pageSize).subscribe(videoPage => {
      if (videoPage.videos.length !== 0) {
        this.videos.push(...videoPage.videos);
        this.page++;
        this.loading = false;
      }
    });
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

  getUserId(): number {
    return this.userService.getUserId();
  }

}
