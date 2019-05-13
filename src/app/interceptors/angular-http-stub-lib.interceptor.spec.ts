import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestService } from '../services/rest/rest.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpStubInterceptor, HttpStub, MockConfig } from 'angular-http-stub-lib';
import expectedFileResponse from './mock/simpleFileResponse.json';

describe(`HttpStubInterceptor`, () => {
  let service: RestService;
  let config: MockConfig = {
    "forward": false,
    "mockFolder": "./",
    "requests": [
      {
        "method": "GET",
        "path": {
          "base": "/v2/beers",
          "queries": {
            "beer_name": "punk_ipa"
          }
        },
        "responseJson": {
          "description": "good beer"
        }
      },
      {
        "method": "GET",
        "path": {
          "base": "/simple/api/file"
        },
        "responseJson": {},
        "responseFile": "mock/simpleFileResponse.json"
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RestService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpStubInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(RestService);
  });

  it('should load HttpStub', () => {
    HttpStub.load(config as any);

    const stubResponseBody = { description: 'good beer' };

    // Here fetch is in stub, I expect the mocked response
    service.getBeer().subscribe(responseStub => {
      expect(responseStub).not.toBeNull();
      expect(responseStub).toEqual(stubResponseBody);
    });
  });

  it('should unload HttpStub', () => {
    HttpStub.unload();

    const stubResponseBody = { description: 'good beer' };

    // Here I'm not using stub, I expect the real response from punkApi
    service.getBeer().subscribe(responseWeb => {
      expect(responseWeb).not.toBeNull();
      expect(responseWeb).not.toEqual(stubResponseBody);
    });
  });

  it('should load HttpStub and read JSON file', () => {
    HttpStub.load(config as any);

    // Here fetch is in stub, I expect the mocked response
    service.simpleApiFile().subscribe(responseStub => {
      expect(responseStub).not.toBeNull();
      expect(responseStub).toEqual(expectedFileResponse);
    });
  });
});