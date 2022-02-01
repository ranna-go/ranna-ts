import { ExecutionRequest } from '../models';

export interface EventDataMap {
  [EventCode.PONG]: string;
  [EventCode.ERROR]: string;
  [EventCode.SPAWN]: RunID;
  [EventCode.LOG]: LogData;
  [EventCode.STOP]: StopData;
  [EventCode.KILL]: null;
}

export interface OpArgsMap {
  [OpCode.PING]: null;
  [OpCode.EXEC]: ExecutionRequest;
  [OpCode.KILL]: RunID;
}

export enum EventCode {
  PONG,
  ERROR,
  SPAWN,
  LOG,
  STOP,
  KILL,
}

export enum OpCode {
  PING,
  EXEC,
  KILL,
}

export interface Nonced {
  nonce?: number;
}

export interface Event<T> extends Nonced {
  code: EventCode;
  data: T;
}

export interface Operation<T = null> extends Nonced {
  op: OpCode;
  args?: T;
}

export interface RunID {
  runid: string;
}

export interface LogData extends RunID {
  stdout?: string;
  stderr?: string;
}

export interface StopData extends RunID {
  exectimems: number;
}
