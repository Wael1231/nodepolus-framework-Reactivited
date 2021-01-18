import { Connection } from "../../../protocol/connection";
import { DisconnectReason } from "../../../types";

/**
 * Fired when a connection to the server has been closed, either by the
 * connection or forcibly by the server.
 */
export class ConnectionClosedEvent {
  constructor(
    private readonly connection: Connection,
    private readonly reason: DisconnectReason = DisconnectReason.serverRequest(),
  ) {}

  /**
   * Gets the connection that was closed.
   */
  getConnection(): Connection {
    return this.connection;
  }

  /**
   * Gets the reason for why the connection was closed.
   */
  getReason(): DisconnectReason {
    return this.reason;
  }
}
