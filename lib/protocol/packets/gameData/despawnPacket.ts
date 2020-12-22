import { MessageReader, MessageWriter } from "../../../util/hazelMessage";
import { BaseGameDataPacket } from "./baseGameDataPacket";
import { GameDataPacketType } from "../types/enums";

export class DespawnPacket extends BaseGameDataPacket {
  constructor(
    public innerNetObjectID: number,
  ) {
    super(GameDataPacketType.Despawn);
  }

  static deserialize(reader: MessageReader): DespawnPacket {
    return new DespawnPacket(reader.readPackedUInt32());
  }

  serialize(): MessageWriter {
    return new MessageWriter().writePackedUInt32(this.innerNetObjectID);
  }
}