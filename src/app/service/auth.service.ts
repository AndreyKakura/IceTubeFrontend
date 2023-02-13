import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {AuthResponseDto} from "../dto/auth-response-dto";
import {Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  apiUrl = "/api/auth"

  registerUser(inputData: any) {
    return this.httpClient.post(this.apiUrl + '/register', inputData);
  }


  loginUser(inputData: any) {
    return this.httpClient.post<AuthResponseDto>(this.apiUrl + '/token', inputData)
      .pipe(
      map(res => {
        console.log("access" + res.accessToken);
        localStorage.setItem("access_token", res.accessToken);
        console.log("refresh" + res.refreshToken);
        localStorage.setItem("refresh_token", res.refreshToken);
        localStorage.setItem("roles", JSON.stringify(res.roles));
      })
    )

  }


  logout() {
    //todo send logout request to backend
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("roles")
    this.router.navigate(['login']);
  }

  getAccessToken() {
    return localStorage.getItem("access_token");
  }

  getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }


  refreshToken() {
    console.log("auth s start refreshing")
    return this.httpClient.get<AuthResponseDto>(this.apiUrl + "/refresh"/*,
      {headers: new HttpHeaders({'Authorization': 'Bearer ' + this.getRefreshToken()})}*/).pipe(
        map(res => {
          console.log("auth s access: " + res.accessToken);
          localStorage.setItem("access_token", res.accessToken);
          console.log("auth s refresh: " + res.refreshToken);
          localStorage.setItem("refresh_token", res.refreshToken);
          localStorage.setItem("roles", JSON.stringify(res.roles));
        })
    );
  }

}
