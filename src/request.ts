import { APIError, ResponseError } from './errors';

/**
 * Wrap additional options for the Client.
 */
export interface ClientOptions {
  version: string;
  userAgent: string | null;
  auth: string | null;
}

export class RequestClient {
  constructor(private endpoint: string, private options: ClientOptions) {}

  async request<T>(
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

    if (!res.ok) {
      try {
        const data = await res.json();
        throw new APIError(data);
      } catch {
        throw new ResponseError(res);
      }
    }

    return res.json();
  }
}
