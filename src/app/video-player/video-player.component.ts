import {Component, Input, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VideoDto} from "../dto/video-dto";
import {PlyrComponent} from "ngx-plyr";
import * as Plyr from "plyr";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {

  player!: Plyr;

  @Input()
  streamUrl!: string | '';

  @Input()
  previewUrl!: string | '';

  @Input()
  videoResolution!: number | 360;

  videoSources: Plyr.Source[] = [];


  options: Plyr.Options = {
    controls: ['play-large', 'pause-large', 'play', 'current-time', 'progress', 'duration', 'mute', 'volume', 'captions', 'pip', 'airplay', 'settings', 'fullscreen'],
    settings: ['quality', 'speed'],
  };

  constructor(private httpClient: HttpClient) {
  }

  ngAfterViewInit() {
    this.videoSources = [];

    if(this.videoResolution >= 360) {
      this.videoSources.push(
        {
          src: this.streamUrl + '?quality=360p',
          type: 'video/mp4',
          size: 360,
        }
      )
    }

    if(this.videoResolution >= 480) {
      this.videoSources.push(
        {
          src: this.streamUrl + '?quality=480p',
          type: 'video/mp4',
          size: 480,
        }
      )
    }

    if(this.videoResolution >= 720) {
      this.videoSources.push(
        {
          src: this.streamUrl + '?quality=720p',
          type: 'video/mp4',
          size: 720,
        }
      )
    }

    if(this.videoResolution >= 1080) {
      this.videoSources.push(
        {
          src: this.streamUrl + '?quality=1080p',
          type: 'video/mp4',
          size: 1080,
        }
      )
    }
  }


  // getSubtitles(): Observable<any> {
  //   console.log(this.httpClient.get<any>("/api/video/subtitles"));
  //   return this.httpClient.get<any>("/api/video/subtitles");
  // }

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }

}
