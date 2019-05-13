import { logError } from '../Helpers';
import { ResponseFileRetriever } from 'fetch-stub/lib/types';

export const angularResponseFileRetriever: ResponseFileRetriever = async function (mockFolder: string, responsePath: string): Promise<object> {
	const filePath = `${mockFolder}${responsePath}`;

	try {
		// to use this: set module to esnext
		const result = {};// await import(filePath);
		return Promise.resolve(result);
	}
	catch (err) {
		logError(err);
		return Promise.reject(err);
	}
}