import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public instagramUrl = 'https://instagram.com/';
  public twitterUrl = 'https://instagram.com/';
  public baseUrl = 'http://localhost:3100/scrape';
  constructor() { }
}
