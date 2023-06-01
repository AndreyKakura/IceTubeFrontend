import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadVideoComponent} from "./component/upload-video/upload-video.component";
import {RegisterComponent} from "./component/register/register.component";
import {LoginComponent} from "./component/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {UserComponent} from "./component/user/user.component";
import {RoleGuard} from "./guard/role.guard";
import {NotFoundComponent} from "./component/not-found/not-found.component";
import {VideoComponent} from "./component/video/video.component";
import {HistoryComponent} from "./component/history/history.component";
import {LikedVideosComponent} from "./component/liked-videos/liked-videos.component";
import {SubscriptionsComponent} from "./component/subscriptions/subscriptions.component";
import {UserVideosComponent} from "./component/user-videos/user-videos.component";
import {SearchComponent} from "./component/search/search.component";
import {UserEditComponent} from "./component/user-edit/user-edit.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'upload-video', component: UploadVideoComponent, canActivate: [RoleGuard], data: {role: 'ROLE_USER'}},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'video/history', component: HistoryComponent, canActivate: [RoleGuard], data: {role: 'ROLE_USER'}},
  {path: 'video/publishedby/:userId', component: UserVideosComponent},
  {path: 'video/:videoId', component: VideoComponent},
  {path: 'user/likedvideos', component: LikedVideosComponent, canActivate: [RoleGuard], data: {role: 'ROLE_USER'}},
  {path: 'user/subscriptions', component: SubscriptionsComponent, canActivate: [RoleGuard], data: {role: 'ROLE_USER'}},
  {path: 'search/:selectedOption/:searchString', component: SearchComponent},
  {path: 'user-edit', component: UserEditComponent, canActivate: [RoleGuard], data: {role: 'ROLE_USER'}},
  {
    path: 'user',
    component: UserComponent,
    // canActivate: [RoleGuard],
    // data: {role: 'ROLE_USER'},
  },
  {path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
