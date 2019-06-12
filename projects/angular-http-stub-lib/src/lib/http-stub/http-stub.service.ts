import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestMatcher } from 'fetch-stub/lib/RequestMatcher';
import { MockConfig, ExtraConfig, MockConfigError } from 'fetch-stub/lib/types';
import { logError } from '../helpers';
import { ResponseFileRetriever } from 'fetch-stub/lib/types';

@Injectable({
  providedIn: 'root'
})
export class HttpStubService {

  isEnabled = false;
  requestMatcher = new RequestMatcher(null, null);

  constructor(private http: HttpClient) { }

  /**
	 * Start mock server with given configuration
	 */
  load(config: MockConfig, extraConfigs?: ExtraConfig) {
    // TODO: understand how to implement this
    // if (!isInterceptorConfigured) {
    // 	logError('Interceptor not configured.');
    // 	throw new InterceptorConfiguredError('Interceptor not configured.');
    // }

    if (!config) {
      logError('Config file not found.');
      throw new MockConfigError('Config file not found.');
    }

    // FIXME: fileretrievers are not working working
    const myExtraConfigs = Object.assign({
      responseFileRetriever: this.responseFileRetriever
    } as ExtraConfig, extraConfigs);

    const requestMatcher = new RequestMatcher(config, myExtraConfigs);

    this.requestMatcher = requestMatcher;
    this.isEnabled = true;
  }

  /**
  * Disable mock server and start using normal fetch
  * @returns true if it has unloaded
  */
  unload(): boolean {
    this.isEnabled = false;
    return true;
  }

  responseFileRetriever: ResponseFileRetriever = async (mockFolder: string, responsePath: string): Promise<object> => {
    const filePath = `${mockFolder}${responsePath}`;

    try {
      console.log(`Getting: ${filePath}`);
      const result = await this.http.get(filePath).toPromise();
      console.log(`Got:`);
      console.log(result);
      return result;
    }
    catch (err) {
      console.log(`Got error:`);
      logError(err);
      throw err;
    }
  }

  // responseFileRetriever: ResponseFileRetriever = (mockFolder: string, responsePath: string): Promise<object> => {
  //   return new Promise((resolve, reject) => {
  //     const filePath = `${mockFolder}${responsePath}`;

  //     console.log(`Getting: ${filePath}`);
  //     console.log(this.http);
  //     this.http.get(filePath).subscribe(result => {
        
  //       console.log(`Got:`);
  //       console.log(result);
        
  //       return resolve(result);
  //     });
  //   });
  // }
}
