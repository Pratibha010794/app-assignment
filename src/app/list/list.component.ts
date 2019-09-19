import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../services/api.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  arrayOfRepos = [];
  token: any;
  listOfFiles = [];
  isUserLogin;
  constructor(private api: ApiService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.api.isLoggedIn.subscribe((val) => {
      this.isUserLogin = val;
    });
    if (localStorage.getItem('userLogin') === 'yes') {
      this.api.getRepos().subscribe((res: Array<object>) => {
        this.arrayOfRepos = res;
        this.api.isLoggedIn.next(true);
      });
    } else {
      this.activateRoute.queryParamMap.subscribe((parameters) => {
        const code = parameters.params.code;
        this.api.getAccessToken(code).subscribe((data) => {
          localStorage.setItem('token', data.access_token);
          this.api.getRepos().subscribe((res: Array<object>) => {
            this.arrayOfRepos = res;
            this.api.isLoggedIn.next(true);
            localStorage.setItem('userLogin', 'yes');
          });
        });
      });
    }
  }

  getContent(repo, owner) {
    this.api.getFilesFromRepo(repo, owner ).subscribe((res) => {
      this.listOfFiles = res;
    });
  }

}
