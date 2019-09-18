import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-assignment';
  constructor(private api: ApiService) {}
  userLogin() {
    this.api.githubLogin();
    // .subscribe((res) => {
    //   console.log(res);
    // });
  }
}
