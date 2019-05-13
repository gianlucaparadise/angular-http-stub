import { HttpRequest } from '@angular/common/http';
import { IRequest } from 'fetch-stub/lib/types';

export class RequestWrapped implements IRequest {
    httpRequest: HttpRequest<any>;

    method: string;
    url: string;

    text(): Promise<string> {
        return this.httpRequest.body;
    }

    constructor(request: HttpRequest<any>) {
        this.httpRequest = request;
        
        this.method = request.method;
        this.url = request.url;
    }
}