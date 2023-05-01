import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileSystemFileEntry} from "ngx-file-drop";
import {Observable, of, throwError} from "rxjs";
import {VideoDto} from "../dto/video-dto";
import {VideoPageDto} from "../dto/video-page-dto";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) {
  }

  // uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
  //   const formData = new FormData()
  //   formData.append('file', fileEntry, fileEntry.name)
  //   return this.httpClient.post<UploadVideoResponse>("/api/video/upload", formData)
  // }

  uploadVideo(newVideoFormData: FormData): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("/api/video/upload", newVideoFormData)
      .pipe(catchError(() => {
        return throwError("Ошибка сервера");
      }))
  }

  getVideo(videoId: number): Observable<VideoDto> {
    return this.httpClient.get<VideoDto>("/api/video/" + videoId);
  }

  getAllVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("/api/video");
  }

  likeVideo(videoId: number): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("/api/video/" + videoId + "/like", null);
  }

  dislikeVideo(videoId: number): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("/api/video/" + videoId + "/dislike", null);
  }

  getHistoryPage(page: number, size: number): Observable<VideoPageDto> {
    const url = `/api/video/history?pageNumber=${page}&pageSize=${size}`;

    return this.httpClient.get<VideoPageDto>(url);
  }

  getPublishedByUserVideosPage(userId: number, page: number, size: number): Observable<VideoPageDto> {
    const url = `/api/video/publishedby/${userId}?pageNumber=${page}&pageSize=${size}`;
    return this.httpClient.get<VideoPageDto>(url);
  }


  getSubscribedVideos(page: number, size: number): Observable<VideoPageDto> {
    const url = `/api/video/subscriptions?pageNumber=${page}&pageSize=${size}`;
    return this.httpClient.get<VideoPageDto>(url);
  }

  getVideoPage(page: number, size: number): Observable<VideoPageDto> {
    const url = `/api/video?pageNumber=${page}&pageSize=${size}`;
    return this.httpClient.get<VideoPageDto>(url);
  }

  getLikedVideos(page: number, size: number): Observable<VideoPageDto> {
    const url = `/api/video/liked?pageNumber=${page}&pageSize=${size}`;
    return this.httpClient.get<VideoPageDto>(url);
  }

  getVideosByTitle(title: string, page: number, size: number): Observable<VideoPageDto> {
    const url = `/api/video/findbytitle?title=${title}&pageNumber=${page}&pageSize=${size}`;
    return this.httpClient.get<VideoPageDto>(url);
  }

  getVideosByTag(tag: string, page: number, size: number): Observable<VideoPageDto> {
    const url = `/api/video/findbytag?tag=${tag}&pageNumber=${page}&pageSize=${size}`;
    return this.httpClient.get<VideoPageDto>(url);
  }

  generateDownloadLinks(maxResolution: number, videoId: number): Array<[number, string]> {

    let downloadLinks: Array<[number, string]> = [];

    if (maxResolution >= 360) {
      downloadLinks.push([360, `/api/video/download/${videoId}?quality=${360}p`]);
    }

    if (maxResolution >= 480) {
      downloadLinks.push([480, `/api/video/download/${videoId}?quality=${480}p`]);
    }

    if (maxResolution >= 720) {
      downloadLinks.push([720, `/api/video/download/${videoId}?quality=${720}p`]);

    }

    if (maxResolution >= 1080) {
      downloadLinks.push([1080, `/api/video/download/${videoId}?quality=${1080}p`]);

    }
    return downloadLinks;
  }

  deleteVideo(id: number) {
    const url = `/api/video/${id}`;
    return this.httpClient.delete<VideoPageDto>(url);
  }

  deleteVideoAsAdministrator(id: number): Observable<any> {
    const url = `/api/video/admin-delete/${id}`;
    return this.httpClient.delete<VideoPageDto>(url);
  }
}
