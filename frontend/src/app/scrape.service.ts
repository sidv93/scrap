import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpBackend } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { GlobalService } from './global.service';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ScrapeService {

  private socket: any;
  constructor(private http: HttpClient, private globalService: GlobalService) { 
    this.socket = io('http://localhost:3100');
    this.socket.on('twitter', (data) => {
      console.log('NEW TWITTER FOLLOWER');
      console.log(`You have currently ${data.twitter} followers`);
    });
    this.socket.on('instagram', data => {
      console.log('NEW INSTAGRAM FOLLOWER!');
      console.log(`You have currentluy ${data.instagram} followers`);
    })
  }

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
