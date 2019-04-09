import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpBackend } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ScrapeService {

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  public getFollowers(username: string) {
    return this.http.get(this.globalService.scrapeUrl,
      {
        params: new HttpParams().set('username', username)
      }
    );
  }

  public getTwitterFollowers(username: string) {
    console.log(username);
    return this.http.get(this.globalService.scrapeUrl,
      {
        params: new HttpParams().set('twitter', username)
      }
    );
  }

  public getInstagramFollowes(username: string) {
    return this.http.get(this.globalService.scrapeUrl,
      {
        params: new HttpParams().set('instagram',username)
      }
    );
  }

  public getChartData(type: string) {
    let params = new HttpParams().set('type', type);
    return this.http.get(this.globalService.chartUrl,
      {
        params: params
      }  
    )
  }
}
