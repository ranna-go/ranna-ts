import {
  EventCode,
  Event,
  OpCode,
  Operation,
  OpArgsMap,
  EventDataMap,
} from './models';

/**
 * WebSocket client to connect to the ranna WebSocket API,
 * send operations and receive events.
 */
export class WebSocketClient {
  private ws: WebSocket;

  /**
   * Creates a new instance of WebSocketClient connectiong
   * to the given endpoint address.
   * @param endpoint
   */
  constructor(private endpoint: string) {
    this.ws = new WebSocket(this.endpoint);
  }

  /**
   * Send an operation with args and an optional nonce.
   * When passed, the nonce will be included in subsequent
   * event corresponding to the operation invoked.
   * @param op The operation code.
   * @param args The operation arguments.
   * @param nonce Optional nonce.
   */
  public op<TK extends OpCode, TE extends Operation<OpArgsMap[TK]>>(
    op: TK,
    args: TE,
    nonce?: number
  ) {
    this.ws.send(
      JSON.stringify({
        op,
        args,
        nonce,
      })
    );
  }

  /**
   * Register an event handler which is called when the
   * specified event has been received.
   *
   * It returns a function which can be called to
   * remove the event handler.
   *
   * @param code Event code.
   * @param handler Event handler.
   * @returns Event remover.
   */
  public onEvent<TK extends EventCode, TE extends Event<EventDataMap[TK]>>(
    code: TK,
    handler: (e: TE) => void
  ): () => void {
    return this.addListener('message', (e) => {
      const eData = JSON.parse(e.data) as TE;
      if (eData.code === code) handler(eData);
    });
  }

  /**
   * Register a handler which will be called when
   * the web socket connection has been closed.
   *
   * It returns a function which can be called to
   * remove the event handler.
   *
   * @param handler Event handler.
   * @returns Event remover.
   */
  public onClose(handler: (e: CloseEvent) => void): () => void {
    return this.addListener('close', handler);
  }

  /**
   * Close the web socket connection.
   */
  public close() {
    this.ws.close();
  }

  private addListener<K extends keyof WebSocketEventMap>(
    name: K,
    handler: (e: WebSocketEventMap[K]) => void
  ): () => void {
    this.ws.addEventListener(name, handler);
    return () => this.ws.removeEventListener(name, handler);
  }
}
