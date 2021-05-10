export interface Spec {
  image: string;
  entrypoint: string;
  cmd: string;
  filename: string;
  use: string;
  registry: string;
}

export type SpecMap = { [key: string]: Spec };

export type StringMap = { [key: string]: string };

export interface ExecutionRequest {
  language: string;
  code: string;
  arguments?: string[];
  environment?: StringMap;
}

export interface ExecutionResponse {
  stdout: string;
  stderr: string;
  exectimems: number;
}

export interface ErrorResponse {
  error: string;
  code: number;
  context: string;
}

export interface Entity {
  id: string;
  timestamp: string;
}

export interface Snippet extends Entity {
  ident: string;
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
