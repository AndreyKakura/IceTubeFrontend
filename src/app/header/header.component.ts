import {Component, EventEmitter, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../service/auth.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  selectedOption = 'title'
  searchString = '';

  constructor(private authService: AuthService, private httpClient: HttpClient, private matSnackBar: MatSnackBar,
              private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.split('/')[1] !== 'search') {
          this.searchString = '';
        }
      }
    });
  }
  search() {
    if (this.searchString !== '') {
      this.router.navigate(["/search", this.selectedOption, this.searchString]);
    }
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

  toggleSidebar() {
    this.toggleSidenav.emit();
  }
}
