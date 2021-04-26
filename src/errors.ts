import { ErrorResponse } from './models';

export class APIError extends Error implements ErrorResponse {
  private _code: number;
  private _error: string;
  private _context: string;

  constructor(res: ErrorResponse) {
    super(res.error);
    this._code = res.code;
    this._error = res.error;
    this._context = res.context;
  }

  public get code(): number {
    return this._code;
  }

  public get error(): string {
    return this._error;
  }

  public get context(): string {
    return this._context;
  }
}

export class ResponseError extends Error {
  private _response: Response;

  constructor(res: Response) {
    super(`request failed: ${res.status}`);
    this._response = res;
  }

  public get response(): Response {
    return this._response;
  }
}
