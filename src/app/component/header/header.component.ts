import {Component, EventEmitter, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../service/auth.service";
import {ActivatedRoute, GuardsCheckEnd, NavigationEnd, Router} from "@angular/router";

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
              private router: Router, private activatedRoute: ActivatedRoute) {

    // this.router.events.subscribe((val) => {
    //   if (val instanceof NavigationEnd) {
    //     console.log(this.activatedRoute.snapshot.params['selectedOption']);
    //   }
    // });

    router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        const urlParts = event.url.split('/');
        if (urlParts[1] !== 'search') {
          this.searchString = '';
        } else if (urlParts[1] == 'search') {
          this.selectedOption = decodeURI(urlParts[2]);
          this.searchString = decodeURI(urlParts[3]);
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
