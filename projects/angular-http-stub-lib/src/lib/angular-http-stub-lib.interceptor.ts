import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// import { HttpStub } from './models/HttpStub';
import { RequestMatcher } from 'fetch-stub/lib/RequestMatcher';
import { RequestWrapped } from './models/RequestWrapped';
import { MissingDescriptorError } from 'fetch-stub/lib/types';
import { HttpStubService } from './http-stub/http-stub.service';

@Injectable()
export class HttpStubInterceptor implements HttpInterceptor {

  constructor(private httpStub: HttpStubService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.httpStub.isEnabled) {
      return next.handle(request);
    }

    const requestMatcher: RequestMatcher = this.httpStub.requestMatcher;

    const requestWrapped = new RequestWrapped(request);
    const $response = from(requestMatcher.getResponse(requestWrapped));

    return $response.pipe(
      switchMap(stringBody => {
        console.log('StringBody');
        console.log(stringBody);
        if (stringBody) {
          const body = JSON.parse(stringBody);
          const response = new HttpResponse({ body });
          return of(response);
        }

        if (!requestMatcher.config.forward) {
          return throwError(new MissingDescriptorError('404 - Not Found'));
        }

        //#region Forwarding request
        return next.handle(request);
        //#endregion
      })
    );
  }
}
