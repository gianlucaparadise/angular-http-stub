import { MockConfig, MockConfigError, ExtraConfig } from 'fetch-stub/lib/types'
import { logError } from '../helpers'
import { RequestMatcher } from 'fetch-stub/lib/RequestMatcher'
// import { angularResponseFileRetriever } from './AngularFileReader';
import { defaultResponseFileRetriever } from 'fetch-stub/lib/readers/DefaultFileReader';

export class HttpStub {
    static isEnabled = false;
    static requestMatcher = new RequestMatcher(null, null);
    
	/**
	 * Start mock server with given configuration
	 */
	static load(config: MockConfig, extraConfigs?: ExtraConfig) {
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

		HttpStub.requestMatcher = requestMatcher;
		HttpStub.isEnabled = true;
	}

	/**
	 * Disable mock server and start using normal fetch
	 * @returns true if it has unloaded
	 */
	static unload(): boolean {
		HttpStub.isEnabled = false;
		return true;
	}
}