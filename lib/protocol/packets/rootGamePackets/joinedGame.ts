import { MessageReader, MessageWriter } from "../../../util/hazelMessage";
import { BaseRootGamePacket } from "../basePacket";
import { RoomCode } from "../../../util/roomCode";
import { RootGamePacketType } from "../types";

export class JoinedGamePacket extends BaseRootGamePacket {
  constructor(
    public readonly roomCode: string,
    public readonly joinedClientId: number,
    public readonly hostClientId: number,
    public readonly otherClientIds: number[],
  ) {
    super(RootGamePacketType.JoinedGame);
  }

  static deserialize(reader: MessageReader): JoinedGamePacket {
    return new JoinedGamePacket(
      RoomCode.decode(reader.readInt32()),
      reader.readUInt32(),
      reader.readUInt32(),
      reader.readList(sub => sub.readPackedUInt32()),
    );
  }

  serialize(): MessageWriter {
    return new MessageWriter()
      .writeInt32(RoomCode.encode(this.roomCode))
      .writeUInt32(this.joinedClientId)
      .writeUInt32(this.hostClientId)
      .writeList(this.otherClientIds, (sub, id) => sub.writePackedUInt32(id));
  }
}
