import { MessageReader, MessageWriter } from "../../../util/hazelMessage";
import { RpcPacketType } from "../types/enums";
import { BaseRpcPacket } from ".";

/**
 * RPC Packet ID: `0x14` (`20`)
 */
export class ExitVentPacket extends BaseRpcPacket {
  constructor(
    public readonly ventId: number,
  ) {
    super(RpcPacketType.ExitVent);
  }

  static deserialize(reader: MessageReader): ExitVentPacket {
    return new ExitVentPacket(reader.readPackedUInt32());
  }

  serialize(): MessageWriter {
    return new MessageWriter().writePackedUInt32(this.ventId);
  }
}
