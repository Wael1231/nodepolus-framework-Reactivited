import { MessageReader, MessageWriter } from "../../../util/hazelMessage";
import { DisconnectReason } from "../../../types/disconnectReason";
import { AlterGameTag } from "../../../types/alterGameTag";
import { BaseRootGamePacket } from "../basePacket";
import { RoomCode } from "../../../util/roomCode";
import { RootGamePacketType } from "../types";

export class KickPlayerPacket extends BaseRootGamePacket {
  constructor(
    readonly roomCode: string,
    readonly kickedClientId: AlterGameTag,
    readonly banned: boolean,
    readonly disconnectReason?: DisconnectReason,
  ) {
    super(RootGamePacketType.KickPlayer);
  }

  static deserialize(reader: MessageReader): KickPlayerPacket {
    return new KickPlayerPacket(
      RoomCode.decode(reader.readInt32()),
      reader.readPackedUInt32(),
      reader.readBoolean(),
      reader.hasBytesLeft() ? new DisconnectReason(reader.readByte()) : undefined,
    );
  }

  serialize(): MessageWriter {
    const writer = new MessageWriter()
      .writeInt32(RoomCode.encode(this.roomCode))
      .writePackedUInt32(this.kickedClientId)
      .writeBoolean(this.banned);

    if (this.disconnectReason) {
      this.disconnectReason.serialize(writer);
    }

    return writer;
  }
}
