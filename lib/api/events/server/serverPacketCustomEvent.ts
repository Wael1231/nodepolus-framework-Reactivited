import { BaseRootPacket } from "../../../protocol/packets/root";
import { Connection } from "../../../protocol/connection";

/**
 * Fired when a connection sends a root packet not defined in the base protocol.
 */
export class ServerPacketCustomEvent {
  /**
   * @param connection The connection that sent the packet
   * @param packet The packet that was sent
   */
  constructor(
    private readonly connection: Connection,
    private readonly packet: BaseRootPacket,
  ) {}

  /**
   * Gets the connection that sent the packet.
   */
  getConnection(): Connection {
    return this.connection;
  }

  /**
   * Gets the packet that was sent.
   */
  getPacket(): BaseRootPacket {
    return this.packet;
  }
}