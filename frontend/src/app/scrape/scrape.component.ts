import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { ScrapeService } from '../scrape.service';

@Component({
  selector: 'app-scrape',
  templateUrl: './scrape.component.html',
  styleUrls: ['./scrape.component.css']
})
export class ScrapeComponent implements OnInit, OnDestroy {

  public stats$: Observable<any>;
  public username: String;
  constructor(private scrapeService: ScrapeService) { }

  ngOnInit() {
    this.getStats();
  }

  ngOnDestroy() {
  }

  public getStats(type: String='both') {
    switch (type) {
      case 'twitter': {
        this.scrapeService.getTwitterFollowers(this.username);
        break;
      }
      case 'insta': {
        this.stats$ = this.scrapeService.getInstagramFollowes(this.username);
        break;
      }
      default: {
        this.stats$ = this.scrapeService.getFollowers(this.username);
        break;
      }
    }
  }

}
