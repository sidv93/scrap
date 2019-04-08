import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ScrapeService {

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  public getFollowers(username: String) {
    return this.http.get(this.globalService.baseUrl);
  }

  public getTwitterFollowers(username: String) {
    return this.http.get(this.globalService.baseUrl);
  }

  public getInstagramFollowes(username: String) {
    return this.http.get(this.globalService.baseUrl);
  }
}
