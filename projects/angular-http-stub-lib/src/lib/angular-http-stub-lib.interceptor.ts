import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpStub } from './models/HttpStub';
import { RequestMatcher } from 'fetch-stub/lib/RequestMatcher';
import { RequestWrapped } from './models/RequestWrapped';
import { MissingDescriptorError } from 'fetch-stub/lib/types';

@Injectable()
export class HttpStubInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!HttpStub.isEnabled) {
        return next.handle(request);
      }

        const requestMatcher: RequestMatcher = HttpStub.requestMatcher;

        const requestWrapped = new RequestWrapped(request);
        const $response = from(requestMatcher.getResponse(requestWrapped));

        return $response.pipe(
            switchMap(stringBody => {
                if (stringBody) {
                    const body = JSON.parse(stringBody);
                    const response = new HttpResponse({ body: body });
                    return of(response);
                }
        
                if (!requestMatcher.config.forward) {
                    return Observable.throw(new MissingDescriptorError("404 - Not Found"));
                }
        
                //#region Forwarding request
                return next.handle(request);
                //#endregion
            })
        );
  }
}
