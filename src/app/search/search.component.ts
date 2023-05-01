import {Component, OnInit} from '@angular/core';
import {VideoDto} from "../dto/video-dto";
import {VideoService} from "../service/video.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  selectedOption?: string;
  searchString?: string;
  page = 0;
  pageSize = 12;
  loading = false;
  videos: Array<VideoDto> = [];

  constructor(private videoService: VideoService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.selectedOption = params.get('selectedOption')?.toString();
      this.searchString = params.get('searchString')?.toString();
      this.videos = [];
      this.page = 0;
      this.loadVideos();
    });

  }


  onScroll() {
    if (!this.loading) {
      this.loadVideos();
    }
  }

  loadVideos(): void {
    this.loading = true;
    switch (this.selectedOption) {
      case 'title': {
        if (this.searchString !== undefined) {
          this.videoService.getVideosByTitle(this.searchString, this.page, this.pageSize).subscribe(videoPage => {
            if (videoPage.videos !== null) {
              this.videos.push(...videoPage.videos);
              this.page++;
              this.loading = false;
            }
          });
        }
        break;
      }
      case 'tag': {
        if (this.searchString !== undefined) {
          this.videoService.getVideosByTag(this.searchString, this.page, this.pageSize).subscribe(videoPage => {
            if (videoPage.videos !== null) {
              this.videos.push(...videoPage.videos);
              this.page++;
              this.loading = false;
            }
          });
        }
        break;
      }

    }
  }
}
