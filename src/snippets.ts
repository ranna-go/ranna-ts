import { Snippet } from './models';
import { ClientOptions, RequestClient } from './request';

const defaultOptions: ClientOptions = {
  version: 'v1',
  userAgent: 'ranna-ts',
  auth: null,
};

/**
 * Request client to perform API requests
 * against the snippet API.
 */
export class SnippetsClient extends RequestClient {
  /**
   * Initialize a new client connected to the passed ranna
   * server endpoint.
   *
   * You can specify additional options like the API version
   * (default 'v1'), the user agent header or the authorization
   * header, if required.
   *
   * @param endpoint The ranna snippets server endpoint.
   * @param options Additional options.
   */
  constructor(endpoint: string, options: ClientOptions = defaultOptions) {
    super(endpoint, options);
  }

  /**
   * Reqeusts a sinlie snippet by ident or id.
   * @param ident
   * @returns
   */
  public async get(ident: string): Promise<Snippet> {
    return this.request('GET', `snippets/${ident}`);
  }

  /**
   * Creates a new snippet with the passed content.
   * @param snippet
   * @returns
   */
  public async create(snippet: Snippet): Promise<Snippet> {
    return this.request('POST', 'snippets', snippet);
  }
}
