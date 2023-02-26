import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadVideoComponent} from "./upload-video/upload-video.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {RoleGuard} from "./guard/role.guard";
import {NotFoundComponent} from "./not-found/not-found.component";
import {VideoComponent} from "./video/video.component";
import {HistoryComponent} from "./history/history.component";
import {LikedVideosComponent} from "./liked-videos/liked-videos.component";
import {SubscriptionsComponent} from "./subscriptions/subscriptions.component";
import {UserVideosComponent} from "./user-videos/user-videos.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'upload-video', component: UploadVideoComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'video/history', component: HistoryComponent},
  {path: 'video/publishedby/:userId', component: UserVideosComponent},
  {path: 'video/:videoId', component: VideoComponent},
  {path: 'user/likedvideos', component: LikedVideosComponent},
  {path: 'user/subscriptions', component: SubscriptionsComponent},
  {
    path: 'user',
    component: UserComponent,
    canActivate: [RoleGuard],
    data: {role: 'ROLE_USER'},
  },
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
