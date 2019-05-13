import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getBeer() {
    return this.http.get(`https://api.punkapi.com/v2/beers?beer_name=punk_ipa`);
  }

  simpleApiFile() {
    return this.http.get(`http://example.com/simple/api/file`);
  }
}
