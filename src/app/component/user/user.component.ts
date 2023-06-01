import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserDto} from "../../dto/user-dto";
import {AuthService} from "../../service/auth.service";
import {VideoDto} from "../../dto/video-dto";
import {VideoService} from "../../service/video.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  currentUser!: UserDto;

  page = 0;

  pageSize = 12;

  loading = false;

  videos: Array<VideoDto> = [];


  constructor(private userService: UserService, private authService: AuthService, private videoService: VideoService) {

  }

  ngOnInit(): void {
    this.userService.getCurrent().subscribe(user => {
      this.currentUser = user;
      this.loadVideos();
    });
    // this.loadVideos();
  }

  onScroll() {
    if (!this.loading) {
      this.loadVideos();
    }
  }


  loadVideos(): void {
    this.loading = true;
    this.videoService.getPublishedByUserVideosPage(this.currentUser?.id, this.page, this.pageSize).subscribe(videoPage => {
      if (videoPage.videos.length !== 0) {
        this.videos.push(...videoPage.videos);
        this.page++;
        this.loading = false;
      }
    });
  }

  proceedLogout() {
    this.authService.logout();
  }
}
