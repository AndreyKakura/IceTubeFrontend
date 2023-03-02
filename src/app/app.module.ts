import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UploadVideoComponent} from './upload-video/upload-video.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxFileDropModule} from "ngx-file-drop";
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {VgBufferingModule} from "@videogular/ngx-videogular/buffering";
import {VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play";
import {VgControlsModule} from "@videogular/ngx-videogular/controls";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {VideoPlayerComponent} from './video-player/video-player.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {HomeComponent} from './home/home.component';
import {AuthInterceptor} from "./auth.interceptor";
import {UserComponent} from './user/user.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {IfRolesDirective} from './if-roles.directive';
import {CommonModule} from "@angular/common";
import {LayoutModule} from "@angular/cdk/layout";
import {VideoComponent} from './video/video.component';
import {PlyrModule} from "ngx-plyr";
import {HistoryComponent} from './history/history.component';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {LikedVideosComponent} from './liked-videos/liked-videos.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {VideoCardComponent} from './video-card/video-card.component';
import {CommentsComponent} from './comments/comments.component';
import {UserCardComponent} from './user-card/user-card.component';
import {UserVideosComponent} from './user-videos/user-videos.component';
import {IfAuthenticatedDirective} from './if-authenticated.directive';
import {MatMenuModule} from "@angular/material/menu";
import {SpinnerComponent} from './spinner/spinner.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ServiceWorkerModule} from '@angular/service-worker';
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    AppComponent,
    UploadVideoComponent,
    HeaderComponent,
    VideoPlayerComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    NotFoundComponent,
    IfRolesDirective,
    VideoComponent,
    HistoryComponent,
    SubscriptionsComponent,
    LikedVideosComponent,
    SidebarComponent,
    VideoCardComponent,
    CommentsComponent,
    UserCardComponent,
    UserVideosComponent,
    IfAuthenticatedDirective,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatSnackBarModule,
    MatCardModule,
    MatRadioModule,
    CommonModule,
    LayoutModule,
    PlyrModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
