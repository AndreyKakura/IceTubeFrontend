import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VideoService} from "../service/video.service";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {

  videoId!: number;
  streamUrl!: string;

  previewUrl!: string;

  title!: string;

  description!: string;

  tags!: Array<string>;


  videoAvailable: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      console.log(data.streamUrl);
      this.streamUrl = data.streamUrl;
      this.previewUrl = data.previewUrl;
      this.title = data.title;
      this.description = data.description;
      this.tags = data.tags;
      this.videoAvailable = true;
    })
  }

  onTagClick(tag: string) {
    //todo
  }
}
