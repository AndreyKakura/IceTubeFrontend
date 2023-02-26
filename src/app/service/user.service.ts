import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }


  subscribe(authorId: number): Observable<boolean> {
    return this.httpClient.post<boolean>("api/user/subscribe/" + authorId, null);
  }

  unsubscribe(authorId: number): Observable<boolean> {
    return this.httpClient.post<boolean>("api/user/unsubscribe/" + authorId, null);
  }
}
