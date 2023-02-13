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

  constructor(private authService: AuthService, private httpClient: HttpClient) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem("access_token") == null) {
      return next.handle(request);
    }
    console.log("isRefreshing : " + this.isRefreshing);
    request = request.clone({
      headers: request.headers.set("Authorization", "Bearer " +
        (this.isRefreshing ? localStorage.getItem('refresh_token') : localStorage.getItem("access_token")))
    })

    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !request.url.includes('auth/token') &&
          error.status === 401
        ) {
          console.log("inter c 401 handle401 start")
          return this.handle401Error(request, next);
        }
        console.log("inter c not 401 throw error")
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (localStorage.getItem('access_token') != null) {
        return this.refreshToken2(request, next).pipe(
          switchMap(() => {
            this.isRefreshing = false;

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
              console.log("handler c 403")
              this.authService.logout();
              // this.eventBusService.emit(new EventData('logout', null));
            }
            // console.log("handler c not 403 throwing error")
            // return throwError(() => error);//todo
            console.log("handler c not 403 changing header")
            request = request.clone({
              headers: request.headers.set("Authorization", "Bearer " +
                (this.isRefreshing ? localStorage.getItem('refresh_token') : localStorage.getItem("access_token")))
            });
            return next.handle(request);
          })
        );
      }
    }

    return next.handle(request);
  }


  refreshToken2(request: HttpRequest<any>, next: HttpHandler) {
    console.log("auth s start refreshing")
    return this.httpClient.get<AuthResponseDto>("/api/auth/refresh")
      .pipe(
        map(res => {
          console.log("auth s access: " + res.accessToken);
          localStorage.setItem("access_token", res.accessToken);
          console.log("auth s refresh: " + res.refreshToken);
          localStorage.setItem("refresh_token", res.refreshToken);
          localStorage.setItem("roles", JSON.stringify(res.roles));
          // return next.handle(request);
        }));
  }
}
