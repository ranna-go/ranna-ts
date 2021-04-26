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
