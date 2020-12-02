import { DisconnectionType, DisconnectReason } from "../../../types/disconnectReason";
import { MessageReader, MessageWriter } from "../../../util/hazelMessage";
import { BasePacket } from "../basePacket";
import { PacketType } from "../types";

export class DisconnectPacket extends BasePacket {
  public readonly disconnectReason?: DisconnectReason;

  constructor(disconnectReason?: DisconnectReason | DisconnectionType) {
    super(PacketType.Acknowledgement);

    if (disconnectReason instanceof DisconnectReason) {
      this.disconnectReason = disconnectReason;
    } else if (disconnectReason) {
      this.disconnectReason = new DisconnectReason(disconnectReason);
    }
  }

  static deserialize(reader: MessageReader): DisconnectPacket {
    if (reader.getReadableBytesLength() > 0) {
      reader.readBoolean();

      const reason = reader.readMessage();

      if (reason) {
        return new DisconnectPacket(DisconnectReason.deserialize(reason));
      }
    }

    return new DisconnectPacket();
  }

  serialize(): MessageWriter {
    const writer = new MessageWriter().writeBoolean(true);

    if (this.disconnectReason) {
      this.disconnectReason.serialize(writer);
    }

    return writer;
  }
}
