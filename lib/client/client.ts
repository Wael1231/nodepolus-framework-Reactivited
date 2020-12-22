import { PacketDestination } from "../protocol/packets/types/enums";
import { Connection } from "../protocol/connection";
import { ClientConfig, ClientInstance } from ".";
import { DisconnectReason } from "../types";
import dgram from "dgram";

export class Client implements ClientInstance {
  // TODO: client instance wasn't meant for an actual client :(((
  // TODO: no, it is. also you are going to create a connection on this right?
  public id = -1;
  public socket: dgram.Socket;
  public connection: Connection;

  constructor(public config: ClientConfig) {
    this.socket = dgram.createSocket("udp4");
    this.connection = new Connection({
      address: config.address,
      port: config.port,
      family: "IPv4",
      size: 0,
    }, this.socket, PacketDestination.Server);

    this.socket.on("message", buffer => {
      this.connection.emit("message", buffer);
    });
  }

  async connect(): Promise<void> {
    return new Promise(resolve => {
      this.socket.connect(this.config.port, this.config.address, resolve);
    });
  }

  sendKick(_banned: boolean, _reason: DisconnectReason): void {
    throw new Error("Method not implemented.");
  }

  sendLateRejection(_disconnectReason: DisconnectReason): void {
    throw new Error("Method not implemented.");
  }

  sendWaitingForHost(): void {
    throw new Error("Method not implemented.");
  }
}