import { Snippet, Token, UserCreate } from './models';
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
   * Creaates an account with the given username and returns
   * the account properties including the account master key.
   *
   * This masterkey is exchanged againbst an API key later,
   * which can be reviewed and regenerated. Also, the master
   * key is required to delete an account.
   *
   * The masterkey is only shown ONCE at account creation
   * and CAN NOT BE REVIEWED AGAIN AFTER THAT!
   *
   * @param username
   * @returns
   */
  public createAccount(username: string): Promise<UserCreate> {
    return this.request('PUT', `users/${username}`);
  }

  /**
   * Exchanges the passed master key for the passed username
   * against an API key which is used for subsequent requests.
   *
   * The API key can also be regenerated using this endpoint
   * if already existent.
   *
   * You can set `store` to true to stroe the received API
   * key in the request client.
   *
   * @param username
   * @param masterkey
   * @param store
   * @returns
   */
  public async exchangeAPIToken(
    username: string,
    masterkey: string,
    store: boolean = false
  ): Promise<Token> {
    this.clientOptions.auth = 'bearer ' + masterkey;
    let res: Token | null = null;
    try {
      res = await this.request<Token>('POST', `users/${username}/apitoken`);
      return res;
    } catch (err) {
      throw err;
    } finally {
      if (store && !!res) this.clientOptions.auth = 'bearer ' + res.token;
      else this.clientOptions.auth = null;
    }
  }

  /**
   * Deletes the user wtih the passed username if the passed
   * masterkey matches the account.
   *
   * @param username
   * @param masterkey
   * @returns
   */
  public async deleteAccount(username: string, masterkey: string) {
    this.clientOptions.auth = 'bearer ' + masterkey;
    let res: Token | null = null;
    try {
      res = await this.request<Token>('DELETE', `users/${username}`);
      return res;
    } catch (err) {
      throw err;
    } finally {
      this.clientOptions.auth = null;
    }
  }

  /**
   * Returns a list of snippets belonging to the
   * authorized account.
   *
   * This endpoijt must be authorized with an API
   * token.
   *
   * @returns
   */
  public list(): Promise<Snippet[]> {
    return this.request('GET', 'snippets');
  }

  /**
   * Reqeusts a sinlie snippet by ident or id.
   * @param ident
   * @returns
   */
  public get(ident: string): Promise<Snippet> {
    return this.request('GET', `snippets/${ident}`);
  }

  /**
   * Creates a new snippet with the passed content.
   * @param snippet
   * @returns
   */
  public create(snippet: Snippet): Promise<Snippet> {
    return this.request('POST', 'snippets', snippet);
  }

  /**
   * Updates a snippet with the passed content.
   * @param snippet
   * @returns
   */
  public update(snippet: Snippet): Promise<Snippet> {
    return this.request('POST', `snippets/${snippet.ident}`, snippet);
  }

  /**
   * Deletes a snipped by its ident or ID.
   *
   * This endpoint required authorization by the owner of
   * the snippet. If the snippet was created anonymously,
   * it can not be deleted!
   *
   * @param ident
   * @returns
   */
  public delete(ident: string): Promise<{}> {
    return this.request('DELETE', `snippets/${ident}`);
  }
}
