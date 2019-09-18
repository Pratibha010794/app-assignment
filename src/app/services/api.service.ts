import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  CLIENT_ID = '6839dd148be5494d3499';
  CLIENT_SECRET = 'e15ee4dffd58500c5ac42d2dbeb16c9d70fe7e02';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Accept: 'application/vnd.github.v3+json',
      // Authorization: 'token 2b42dab4efda1dc7c5ad0d6b9e86fff7bd6544ca'
    })
  };
  githubLogin() {
    window.location.href = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.CLIENT_ID}`;
  }
  getAccessToken(sessionCode) {
    const body = {
        code : sessionCode
      };
    return this.http.post(
      `https://github.com/login/oauth/access_token?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}&code=${sessionCode}`,
      body, {responseType: 'text'});
  }
  getRepos() {
    return this.http.get('https://api.github.com/user/repos', this.httpOptions);
  }
  getFilesFromRepo(repoID, ownerID) {
    const url = `https://api.github.com/repos/${ownerID}/${repoID}/contents`;
    return this.http.get(url, this.httpOptions);
  }
}


