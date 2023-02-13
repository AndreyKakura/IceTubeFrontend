import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VideoDto} from "../dto/video-dto";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {
  @Input()
  streamUrl!: string | '';

  constructor(private httpClient: HttpClient) { }


  getSubtitles() : Observable<any>{
    console.log(this.httpClient.get<any>("api/video/subtitles"));
    return this.httpClient.get<any>("api/video/subtitles");
  }
}
