import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MockConfig } from 'fetch-stub/lib/types';
import { HttpStubService } from 'angular-http-stub-lib';
import { RestService } from './services/rest/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private httpStub: HttpStubService, private service: RestService) {}

  title = 'angular-http-stub';

  config: MockConfig = {
    forward: false,
    mockFolder: '/assets/',
    requests: [
      {
        method: 'GET',
        path: {
          base: '/v2/beers',
          queries: {
            beer_name: 'punk_ipa'
          }
        },
        responseJson: {
          description: 'good beer'
        }
      },
      {
        method: 'GET',
        path: {
          base: '/simple/api/file'
        },
        responseJson: {},
        responseFile: 'mock/simpleFileResponse.json'
      }
    ]
  };

  public ngOnInit(): void {
    this.testLocalFile();
    this.testRest();
  }

  async testLocalFile() {
    this.http.get('/assets/mock/simpleFileResponse.json').subscribe((result) => {
      console.log('testLocalFile');
      console.log(result);
    });
  }

  testRest() {
    this.httpStub.load(this.config as any, this.http);

    // Here fetch is in stub, I expect the mocked response
    this.service.simpleApiFile().subscribe(responseStub => {
      console.log('responseStub');
      console.log(responseStub);
    });
  }
}
