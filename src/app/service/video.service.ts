import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileSystemFileEntry} from "ngx-file-drop";
import {Observable} from "rxjs";
import {VideoDto} from "../dto/video-dto";
import {VideoPage} from "../dto/video-page";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) {
  }

  // uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
  //   const formData = new FormData()
  //   formData.append('file', fileEntry, fileEntry.name)
  //   return this.httpClient.post<UploadVideoResponse>("api/video/upload", formData)
  // }

  uploadVideo(newVideoFormData: FormData): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("api/video/upload", newVideoFormData);
  }

  getVideo(videoId: number): Observable<VideoDto> {
    return this.httpClient.get<VideoDto>("api/video/" + videoId);
  }

  getAllVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("api/video");
  }

  likeVideo(videoId: number): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("api/video/" + videoId + "/like", null);
  }

  dislikeVideo(videoId: number): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("api/video/" + videoId + "/dislike", null);
  }

  getHistory(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("api/video/history");
  }

  getPublishedByUserVideos(userId: number): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("api/video/publishedby/" + userId);
  }

  getSubscribedVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("api/video/subscriptions");
  }

  getVideoPage(page: number, size: number): Observable<VideoPage> {
    const url = `api/video?pageNumber=${page}&pageSize=${size}`;
    return this.httpClient.get<VideoPage>(url);
  }
}
