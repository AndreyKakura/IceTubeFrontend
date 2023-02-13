import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private httpClient: HttpClient, private matSnackBar: MatSnackBar) {
  }
  testUser() {
    this.httpClient.get('/api/auth/testuser').subscribe( res => {
      this.matSnackBar.open("user tested", 'ok', {
        duration: 3000
      });
    })
  }
}
