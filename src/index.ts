import {
  ErrorResponse,
  ExecutionRequest,
  ExecutionResponse,
  SpecMap,
} from './models';

/**
 * Wrap additional options for the Client.
 */
export interface ClientOptions {
  version: string;
  userAgent: string | null;
  auth: string | null;
}

const defaultOptions: ClientOptions = {
  version: 'v1',
  userAgent: 'ranna-ts',
  auth: null,
};

/**
 * Request client to perform API requests with.
 */
export class Client {
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
  constructor(
    private endpoint: string,
    private options: ClientOptions = defaultOptions
  ) {}

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

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: any
  ): Promise<T> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    if (this.options.auth) headers.set('Authorization', this.options.auth);
    if (this.options.userAgent)
      headers.set('User-Agent', this.options.userAgent);
    const res = await window.fetch(
      `${this.endpoint}/${this.options.version}/${path}`,
      {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        credentials: this.options.auth ? 'include' : 'omit',
      }
    );

    if (res.ok) {
      try {
        const data = await res.json();
        throw data as ErrorResponse;
      } catch {
        throw new Error(`request failed: ${res.status}`);
      }
    }

    return res.json();
  }
}
