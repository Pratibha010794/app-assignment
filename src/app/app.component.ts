import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-assignment';
  isUserLogin = false;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.isLoggedIn.subscribe((val) => {
      this.isUserLogin = val;
    });
  }
  userLogin() {
    if (this.isUserLogin) {
      this.api.logout();
      this.router.navigateByUrl('/');
    } else {
      this.api.githubLogin();
    }
  }
}
