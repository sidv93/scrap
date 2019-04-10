import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import { ScrapeService } from '../scrape.service';

@Component({
  selector: 'app-scrape',
  templateUrl: './scrape.component.html',
  styleUrls: ['./scrape.component.css']
})
export class ScrapeComponent implements OnInit, OnDestroy {

  public stats$: Observable<any>;
  public username: string;
  constructor(private scrapeService: ScrapeService) { }

  ngOnInit() {
    
  }

  ngOnDestroy() {
  }

  public getStats(type: string='both') {
    console.log('hello');
    switch (type) {
      case 'twitter': {
        this.scrapeService.getTwitterFollowers(this.username).subscribe(
          data => {
            console.log(JSON.stringify(data));
            this.renderChart('twitter');
          }
        );
        break;
      }
      case 'insta': {
        this.scrapeService.getInstagramFollowes(this.username).subscribe(
          data => {
            this.renderChart('instagram');
          }
        );
        break;
      }
      default: {
        this.scrapeService.getFollowers(this.username).subscribe(
          data => {
            this.renderChart();
          }
        );
        break;
      }
    }
  }

  public renderChart(type: string = 'both') {
    console.log(`type ${type}`);
    this.scrapeService.getChartData(type).subscribe(
      data => {
        console.log('data=' + JSON.stringify(data['twitter']));
        let ctx = document.getElementById('myChart');
        let myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: data['twitter'].map(obj => new Date(obj.date).toDateString()),
              datasets: [{
                  label: '# of Votes',
                  data: data['twitter'].map(obj => obj.count),
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
      }
    )
  }
}
