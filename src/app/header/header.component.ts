import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private httpClient: HttpClient, private matSnackBar: MatSnackBar,
              private router: Router) {
  }

  testUser() {
    this.httpClient.get('/api/auth/testuser').subscribe(res => {
      this.matSnackBar.open("user tested", 'ok', {
        duration: 3000
      });
    })
  }

  proceedLogout() {
    this.authService.logout();
  }
}
