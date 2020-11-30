import { MessageReader, MessageWriter } from "../../../../util/hazelMessage";
import { SpawnFlag } from "../../../../types/spawnFlag";
import { BaseGameDataPacket } from "../../basePacket";
import { GameDataPacketType } from "../../types";
import { DataPacket } from "./data";

export class SpawnInnerNetObject extends DataPacket {}

export class SpawnPacket extends BaseGameDataPacket {
  constructor(
    public type: number,
    public owner: number,
    public flags: SpawnFlag,
    public innerNetObjects: SpawnInnerNetObject[],
  ) {
    super(GameDataPacketType.Spawn);
  }

  static deserialize(reader: MessageReader): SpawnPacket {
    return new SpawnPacket(
      reader.readPackedUInt32(),
      reader.readPackedInt32(),
      reader.readByte(),
      reader.readList<SpawnInnerNetObject>(sub => SpawnInnerNetObject.deserialize(sub)),
    );
  }

  serialize(): MessageWriter {
    return new MessageWriter()
      .writePackedUInt32(this.type)
      .writePackedInt32(this.owner)
      .writeByte(this.flags)
      .writeList(this.innerNetObjects, (_, item) => item.serialize());
  }
}
