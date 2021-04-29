import { ExecutionRequest, ExecutionResponse, SpecMap } from './models';
import { ClientOptions, RequestClient } from './request';

const defaultOptions: ClientOptions = {
  version: 'v1',
  userAgent: 'ranna-ts',
  auth: null,
};

/**
 * Request client to perform API requests with.
 */
export class Client extends RequestClient {
  /**
   * Initialize a new client connected to the passed ranna
   * server endpoint.
   *
   * You can specify additional options like the API version
   * (default 'v1'), the user agent header or the authorization
   * header, if required.
   *
   * @param endpoint The ranna server endpoint.
   * @param options Additional options.
   */
  constructor(endpoint: string, options: ClientOptions = defaultOptions) {
    super(endpoint, options);
  }

  /**
   * Request the available spec map.
   * @returns SpecMap
   */
  public spec(): Promise<SpecMap> {
    return this.request('GET', 'spec');
  }

  /**
   * Execute code.
   * @param req Execution request
   * @returns Execution response
   */
  public exec(req: ExecutionRequest): Promise<ExecutionResponse> {
    return this.request('POST', 'exec', req);
  }
}
