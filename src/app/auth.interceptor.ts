import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpClient, HttpHeaders
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError, switchMap} from 'rxjs/operators';
import {AuthService} from "./service/auth.service";
import {AuthResponseDto} from "./dto/auth-response-dto";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private authService: AuthService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let authservice = this.inject.get(AuthService);
    let authreq = request;
    if (this.authService.getAccessToken() == null) {
      // this.authService.goToLogin();
      return next.handle(request);
    } else {
      // console.log("goint to add access token ", this.authService.getAccessToken())
      authreq = this.AddTokenheader(request, this.authService.getAccessToken());
      return next.handle(authreq).pipe(
        catchError(errordata => {
          if (errordata.status === 401) {
            // if(this.authService.getAccessToken() == null) {
            //   this.authService.goToLogin();
            // }
            if (this.isRefreshing) {
              this.isRefreshing = false;
              console.log("intercept caught 401, is refreshing = true");
              console.log("intercept initialized logout");
              this.authService.logout();
            } else {
              return this.handleRefreshToken(request, next);
            }
            // need to implement logout
            // this.authService.logout(); //todo
            // refresh token logic
          }
          return throwError(errordata);
        })
      );
    }
  }

  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    this.isRefreshing = true;
    return this.authService.generateRefreshToken().pipe(
      switchMap((data: any) => {
        this.authService.SaveTokens(data);
        this.isRefreshing = false;
        return next.handle(this.AddTokenheader(request, data.accessToken))
      }),
      catchError(errodata => {
        // console.log("handler initialized logout");
        // this.authService.logout();
        console.log("handler caught error, throwing error")
        return throwError(errodata)//todo
      })
    );
  }

  AddTokenheader(request: HttpRequest<any>, token: any) {
    // console.log("added access token " + token)
    return request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
  }

}
