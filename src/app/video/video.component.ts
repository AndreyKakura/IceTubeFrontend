import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../service/video.service";
import {UserService} from "../service/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  likes!: number;

  dislikes!: number;

  viewCount!: number;

  authorName!: string;

  authorId!: number;

  isSubscribedToAuthor?: boolean;

  isAuthor?: boolean;

  videoResolution!: number | 360;

  downloadLinks!: Array<[number, string]>;

  videoAvailable: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService,
              private userService: UserService, private router: Router, private matSnackBar: MatSnackBar) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      console.log(data.streamUrl);
      this.streamUrl = data.streamUrl;
      this.previewUrl = data.previewUrl;
      this.title = data.title;
      this.description = data.description;
      this.tags = data.tags;
      this.likes = data.likes;
      this.dislikes = data.dislikes;
      this.viewCount = data.viewCount;
      this.authorName = data.authorName;
      this.authorId = data.authorId;
      this.isSubscribedToAuthor = data.isSubscribedToAuthor;
      this.isAuthor = data.isAuthor;
      this.videoResolution = data.videoResolution;
      // setTimeout(() => this.videoAvailable = true, 2000 )
      this.downloadLinks = this.videoService.generateDownloadLinks(data.videoResolution, data.id);
      // this.videoService.generateDownloadLinks(data.videoResolution, data.id).subscribe(links => {
      //     this.downloadLinks = links;
      //   }
      // )
      this.videoAvailable = true;
    });

  }

  onTagClick(tag: string) {
    //todo
  }

  likeVideo() {
    this.videoService.likeVideo(this.videoId).subscribe(data => {
      this.likes = data.likes;
      this.dislikes = data.dislikes;
    })
  }

  dislikeVideo() {
    this.videoService.dislikeVideo(this.videoId).subscribe(data => {
      this.likes = data.likes;
      this.dislikes = data.dislikes;
    })
  }

  subscribe() {
    this.userService.subscribe(this.authorId).subscribe(isSubscribed => {
      this.isSubscribedToAuthor = isSubscribed;
    })
  }

  unsubscribe() {
    this.userService.unsubscribe(this.authorId).subscribe(isSubscribed => {
      this.isSubscribedToAuthor = isSubscribed;
    })
  }

  getUserId(): number {
    return this.userService.getUserId();
  }

  deleteVideo() {
    this.videoService.deleteVideo(this.videoId).subscribe(() => {
        this.matSnackBar.open('Видео безвозвратно удалено', 'Ок', {duration: 3000});
        this.router.navigate(["user"]);
      }
    );
  }

  deleteVideoAsAdministrator() {
    this.videoService.deleteVideoAsAdministrator(this.videoId).subscribe(() => {
      this.matSnackBar.open('Вы воспользовались правами администратора и удалили видео',
        'Ок', {duration: 3000});
      this.router.navigate(["home"]);
    });
  }
}
