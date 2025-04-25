import { DurableObject } from "cloudflare:workers";

export class WebSocketServer extends DurableObject<Env> {
  async fetch(): Promise<Response> {
    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);
    this.ctx.acceptWebSocket(server);

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
    const data = JSON.parse(message.toString());
  }

  async broadcast(message: any) {
    this.ctx.getWebSockets().forEach((ws) => {
      try {
        ws.send(JSON.stringify(message));
      } catch (e) {
        // Probably already closed
      }
    });
  }

  async webSocketClose(ws: WebSocket) {
    ws.close();
  }
}
