export interface Inline {
  import_regex: string;
  template: string;
}

export interface Spec {
  image: string;
  entrypoint: string;
  cmd: string;
  filename: string;
  use: string;
  registry: string;
  example: string;
  inline: Inline;
}

export type SpecMap = { [key: string]: Spec };

export type StringMap = { [key: string]: string };

export interface ExecutionRequest {
  language: string;
  code: string;
  arguments?: string[];
  environment?: StringMap;
  inline_expression: boolean;
}

export interface ExecutionResponse {
  stdout: string;
  stderr: string;
  exectimems: number;
  from_cache: boolean;
  cache_date: string;
}

export interface ErrorResponse {
  error: string;
  code: number;
  status: number;
  context: string;
}

export interface Entity {
  id: string;
  timestamp: string;
}

export interface Snippet extends Entity {
  ident: string;
  displayname: string;
  language: string;
  code: string;
}

export interface SandboxInfo {
  type: string;
  version: string;
}

export interface SystemInfo {
  sandbox: SandboxInfo;
  version: string;
  builddate: string;
  go_version: string;
}

export interface User extends Entity {
  username: string;
}

export interface UserCreate extends User {
  masterkey: string;
}

export interface Token {
  token: string;
}
