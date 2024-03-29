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
    let authreq = request;
    if (this.authService.getAccessToken() == null) {
      return next.handle(request);
    } else {
      authreq = this.AddTokenheader(request, this.authService.getAccessToken());
      return next.handle(authreq).pipe(
        catchError(errordata => {
          if (errordata.status === 401) {
            if (this.isRefreshing) {
              this.isRefreshing = false;
              this.authService.logout();
            } else {
              return this.handleRefreshToken(request, next);
            }
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
        return throwError(errodata)
      })
    );
  }

  AddTokenheader(request: HttpRequest<any>, token: any) {
    return request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
  }
}
