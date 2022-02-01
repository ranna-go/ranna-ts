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
