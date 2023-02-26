import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentDto} from "../dto/comment-dto";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  postComment(commentDto: any, videoId: number): Observable<any> {
    return this.httpClient.post<any>("api/video/" + videoId + "/comment", commentDto);
  }

  getAllComments(videoId: number): Observable<Array<CommentDto>> {
    return this.httpClient.get<Array<CommentDto>>("api/video/" + videoId + "/comment");
  }
}
