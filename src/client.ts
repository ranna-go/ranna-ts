import {
  ExecutionRequest,
  ExecutionResponse,
  SpecMap,
  SystemInfo,
} from './models';
import { ClientOptions, RequestClient } from './request';
import { WebSocketClient } from './ws/client';

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
  public exec(
    req: ExecutionRequest,
    bypassCache: boolean = false
  ): Promise<ExecutionResponse> {
    return this.request('POST', `exec?bypass_cache=${bypassCache}`, req);
  }

  /**
   * Request service information.
   * @returns
   */
  public info(): Promise<SystemInfo> {
    return this.request('GET', 'info');
  }

  /**
   * Connects to the ranna WebSocket API using
   * the specified endpoint.
   * @returns the websocket client.
   */
  public connectWs(): WebSocketClient {
    let endpoint = this.clientEndpoint;
    if (endpoint.startsWith('https://'))
      endpoint = 'wss://' + endpoint.substring(8);
    else if (endpoint.startsWith('http://'))
      endpoint = 'ws://' + endpoint.substring(7);
    return new WebSocketClient(endpoint);
  }
}
