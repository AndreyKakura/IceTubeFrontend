import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'icetube';

  onSidenavOpen() {
    // document.body.classList.add('noscroll');
    document.documentElement.classList.add('sidebar-opened');
  }


  onSidenavClose() {
    // document.body.classList.remove('noscroll');
    document.documentElement.classList.remove('sidebar-opened');

  }
}
