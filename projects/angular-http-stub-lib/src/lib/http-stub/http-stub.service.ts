import { Injectable } from '@angular/core';
import { RequestMatcher } from 'fetch-stub/lib/RequestMatcher';
import { MockConfig, ExtraConfig, MockConfigError } from 'fetch-stub/lib/types';
import { logError } from '../helpers';
import { defaultResponseFileRetriever } from 'fetch-stub/lib/readers/DefaultFileReader';

@Injectable({
  providedIn: 'root'
})
export class HttpStubService {

  isEnabled = false;
  requestMatcher = new RequestMatcher(null, null);

  constructor() { }

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
      logError("Config file not found.");
      throw new MockConfigError("Config file not found.");
    }

    // FIXME: fileretrievers are not working working
    const myExtraConfigs = Object.assign({
      // responseFileRetriever: angularResponseFileRetriever
      responseFileRetriever: defaultResponseFileRetriever
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
}
