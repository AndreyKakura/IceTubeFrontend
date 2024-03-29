import { Component } from '@angular/core';
import {SwUpdate} from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'icetube';

  constructor(updates: SwUpdate) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then( () => {
        document.location.reload();
      })
    })
  }

  onSidenavOpen() {
    // document.body.classList.add('noscroll');
    document.documentElement.classList.add('sidebar-opened');
  }


  onSidenavClose() {
    // document.body.classList.remove('noscroll');
    document.documentElement.classList.remove('sidebar-opened');

  }
}
