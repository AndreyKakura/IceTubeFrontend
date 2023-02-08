import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileSystemFileEntry} from "ngx-file-drop";
import {Observable} from "rxjs";
import {VideoDto} from "./dto/video-dto";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) { }

  // uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
  //   const formData = new FormData()
  //   formData.append('file', fileEntry, fileEntry.name)
  //   return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/v1/video/upload", formData)
  // }

  uploadVideo(newVideoFormData: FormData): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("http://localhost:8080/api/v1/video/upload", newVideoFormData);
  }

  getVideo(videoId: number): Observable<VideoDto> {
   return this.httpClient.get<VideoDto>("http://localhost:8080/api/v1/video/" + videoId);
  }
}
