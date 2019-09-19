import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CONSTANTS} from './../app.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constant = CONSTANTS;
  isLoggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  githubLogin() {
    window.location.href = `${this.constant.githubUrl}/authorize?scope=user:email&client_id=${this.constant.clientId}`;
  }

  getAccessToken(sessionCode) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Accept: 'application/json',
        responseType: 'text',
        Authorization: ''
      })
    };
    return this.http.post(
      `${this.constant.githubUrl}/access_token?client_id=${this.constant.clientId}
      &client_secret=${this.constant.clientSecret}&code=${sessionCode}`,
      {}, httpOptions);
  }

  getRepos() {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Accept: 'application/vnd.github.mercy-preview+json',
        Authorization: `token ${token}`
      }),
      withCredentials : true,
    };
    return this.http.get(`${this.constant.githubApiUrl}/user/repos`, httpOptions);
  }

  getFilesFromRepo(repoName, owner) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Accept: 'application/vnd.github.mercy-preview+json',
        Authorization: `token ${token}`
      })
    };
    const url = `${this.constant.githubApiUrl}/repos/${owner}/${repoName}/contents`;
    return this.http.get(url, httpOptions);
  }

  logout(){
    this.isLoggedIn.next(false);
    localStorage.removeItem('token');
    localStorage.setItem('userLogin', 'false');
  }
}


