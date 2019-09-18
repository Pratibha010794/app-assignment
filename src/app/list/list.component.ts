import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../services/api.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private api: ApiService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.queryParamMap.subscribe((res) => {
      const code = res.params.code;
      this.api.getAccessToken(code).subscribe((res1) => {
        console.log(res1);
      });
    });
  }

}
