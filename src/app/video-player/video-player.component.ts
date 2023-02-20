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


  constructor(private httpClient: HttpClient) {
  }


  getSubtitles(): Observable<any> {
    console.log(this.httpClient.get<any>("api/video/subtitles"));
    return this.httpClient.get<any>("api/video/subtitles");
  }

  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }
}
