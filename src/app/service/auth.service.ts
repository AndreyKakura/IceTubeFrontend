import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthResponseDto} from "../dto/auth-response-dto";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rolesSubject = new BehaviorSubject<string[]>([]);
  public roleChanges = this.rolesSubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
    // When the service is constructed, update the roles subject with the latest value from localStorage.
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    this.rolesSubject.next(roles);
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
          localStorage.setItem("roles", JSON.stringify(res.roles));
          // When the roles in localStorage are updated, emit a new value from the rolesSubject.
          this.rolesSubject.next(res.roles);
        })
      );
  }

  goToLogin() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("roles")
    this.router.navigate(['login']);
  }


  // logout() {
  //   this.httpClient.get(this.apiUrl + "/logout");
  //   localStorage.removeItem("access_token");
  //   localStorage.removeItem("roles")
  // }

  logout() {
    this.httpClient.get(this.apiUrl + '/logout').subscribe({
      next: () => {
        console.log('Access token revoked');
      },
      error: (err) => {
        console.error('Error revoking access token:', err);
      },
      complete: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('roles');
        this.rolesSubject.next([]);
      }
    });
  }

  getAccessToken() {
    return localStorage.getItem("access_token");
  }


  generateRefreshToken() {
    console.log("auth s start refreshing")
    return this.httpClient.get<AuthResponseDto>(this.apiUrl + "/refresh")
  }

  SaveTokens(tokendata
               :
               any
  ) {
    localStorage.setItem('access_token', tokendata.accessToken);
    localStorage.setItem('roles', JSON.stringify(tokendata.roles));
  }

  isAuthenticated() {
    return localStorage.getItem('access_token') != null;
  }

  getRoles() {
    return JSON.parse(localStorage.getItem('roles') || '[]');
  }


  roles()
    :
    Observable<{ roles: string[] }> {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return of({roles});
  }

}
