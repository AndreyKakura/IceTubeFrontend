import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {AuthResponseDto} from "../dto/auth-response-dto";
import {Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
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
        localStorage.setItem("access_token", res.accessToken);
        // localStorage.setItem("refresh_token", res.refreshToken);
        localStorage.setItem("roles", JSON.stringify(res.roles));
      })
    )

  }

  goToLogin() {
    localStorage.removeItem("access_token");
    // localStorage.removeItem("refresh_token");
    localStorage.removeItem("roles")
    this.router.navigate(['login']);
  }


  logout() {
    this.httpClient.get(this.apiUrl + "/logout");
    //todo send logout request to backend
    localStorage.removeItem("access_token");
    // localStorage.removeItem("refresh_token");
    localStorage.removeItem("roles")
  }

  getAccessToken() {
    return localStorage.getItem("access_token");
  }


  generateRefreshToken() {
    console.log("auth s start refreshing")
    return this.httpClient.get<AuthResponseDto>(this.apiUrl + "/refresh")
    //   .pipe(
    //     map(res => {
    //       console.log("auth s access: " + res.accessToken);
    //       localStorage.setItem("access_token", res.accessToken);
    //       console.log("auth s refresh: " + res.refreshToken);
    //       localStorage.setItem("refresh_token", res.refreshToken);
    //       localStorage.setItem("roles", JSON.stringify(res.roles));
    //     })
    // );
  }

  SaveTokens(tokendata: any) {
    localStorage.setItem('access_token', tokendata.accessToken);
    localStorage.setItem('roles', JSON.stringify(tokendata.roles));
    // localStorage.setItem('refreshtoken', tokendata.refreshToken);
  }

}
