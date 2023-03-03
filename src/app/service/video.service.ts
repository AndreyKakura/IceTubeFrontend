import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileSystemFileEntry} from "ngx-file-drop";
import {Observable} from "rxjs";
import {VideoDto} from "../dto/video-dto";
import {VideoPageDto} from "../dto/video-page-dto";

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

  getHistoryPage(page: number, size: number): Observable<VideoPageDto> {
    const url = `api/video/history?pageNumber=${page}&pageSize=${size}`;

    return this.httpClient.get<VideoPageDto>(url);
  }

  getPublishedByUserVideosPage(userId: number, page: number, size: number): Observable<VideoPageDto> {
    const url = `api/video/publishedby/${userId}?pageNumber=${page}&pageSize=${size}`;
    return this.httpClient.get<VideoPageDto>(url);
  }


  getSubscribedVideos(page: number, size: number): Observable<VideoPageDto> {
    const url = `api/video/subscriptions?pageNumber=${page}&pageSize=${size}`;
    return this.httpClient.get<VideoPageDto>(url);
  }

  getVideoPage(page: number, size: number): Observable<VideoPageDto> {
    const url = `api/video?pageNumber=${page}&pageSize=${size}`;
    return this.httpClient.get<VideoPageDto>(url);
  }

  getLikedVideos(page: number, size: number): Observable<VideoPageDto> {
    const url = `api/video/liked?pageNumber=${page}&pageSize=${size}`;
    return this.httpClient.get<VideoPageDto>(url);
  }

}
