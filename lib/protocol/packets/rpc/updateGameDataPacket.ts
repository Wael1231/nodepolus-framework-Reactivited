import { MessageReader, MessageWriter } from "../../../util/hazelMessage";
import { PlayerData } from "../../entities/gameData/types";
import { RpcPacketType } from "../types/enums";
import { Level } from "../../../types/enums";
import { BaseRpcPacket } from ".";

/**
 * RPC Packet ID: `1e` (`30`)
 */
export class UpdateGameDataPacket extends BaseRpcPacket {
  constructor(
    public readonly players: PlayerData[],
  ) {
    super(RpcPacketType.UpdateGameData);
  }

  static deserialize(reader: MessageReader, level?: Level): UpdateGameDataPacket {
    if (level === undefined) {
      throw new Error("Attempted to deserialize RepairSystem without a level");
    }

    return new UpdateGameDataPacket(reader.readAllChildMessages(sub => PlayerData.deserialize(sub, level, sub.getTag())));
  }

  serialize(): MessageWriter {
    const writer = new MessageWriter();

    for (let i = 0; i < this.players.length; i++) {
      writer.startMessage(this.players[i].id);
      this.players[i].serialize(writer, false);
      writer.endMessage();
    }

    return writer;
  }
}
