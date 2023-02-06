import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileSystemFileEntry} from "ngx-file-drop";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "./upload-video/UploadVideoResponse";
import {NewVideoDto} from "./dto/new-video-dto";

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

  uploadVideo(newVideoFormData: FormData): Observable<UploadVideoResponse> {
    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/v1/video/upload", newVideoFormData);
  }
}
