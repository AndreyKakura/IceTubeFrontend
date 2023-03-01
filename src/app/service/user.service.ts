import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VideoDto} from "../dto/video-dto";
import {UserDto} from "../dto/user-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getById(userId: number): Observable<UserDto> {
    return this.httpClient.get<UserDto>("api/user/" + userId);
  }

  subscribe(authorId: number): Observable<boolean> {
    return this.httpClient.post<boolean>("api/user/subscribe/" + authorId, null);
  }

  unsubscribe(authorId: number): Observable<boolean> {
    return this.httpClient.post<boolean>("api/user/unsubscribe/" + authorId, null);
  }

  getLikedVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("api/user/likedvideos")
  }

  getSubscriptions(): Observable<Array<UserDto>> {
    return this.httpClient.get<Array<UserDto>>("api/user/subscriptions");
  }

  getUserId(): number {
    return parseInt(localStorage.getItem("userId") || '0');
  }
}
