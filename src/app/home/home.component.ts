import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { VideoService } from '../service/video.service';
import { VideoDto } from '../dto/video-dto';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('videoContainer') videoContainer!: ElementRef;
  page = 0;
  pageSize = 12;
  loading = false;
  videos: Array<VideoDto> = [];
  private scrollSubject = new Subject();

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.loadVideos();
    this.scrollSubject.pipe(throttleTime(500)).subscribe(() => {
      this.loadVideos();
    });
  }

  ngOnDestroy(): void {
    this.scrollSubject.unsubscribe();
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

  @HostListener('window:scroll', [])
  onScroll(): void {
    const element = this.videoContainer.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (atBottom && !this.loading) {
      this.scrollSubject.next({});
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadVideos();
    }
  }

  nextPage(): void {
    if (this.videos.length >= this.pageSize) {
      this.page++;
      this.loadVideos();
    }
  }
}
