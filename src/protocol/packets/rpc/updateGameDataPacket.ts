import { MessageReader, MessageWriter } from "../../../util/hazelMessage";
import { Level, RpcPacketType } from "../../../types/enums";
import { PlayerData } from "../../entities/gameData/types";
import { BaseRpcPacket } from ".";

/**
 * RPC Packet ID: `0x1e` (`30`)
 */
export class UpdateGameDataPacket extends BaseRpcPacket {
  constructor(
    public players: PlayerData[],
  ) {
    super(RpcPacketType.UpdateGameData);
  }

  static deserialize(reader: MessageReader, level?: Level): UpdateGameDataPacket {
    if (level === undefined) {
      throw new Error("Attempted to deserialize RepairSystem without a level");
    }

    return new UpdateGameDataPacket(reader.readAllChildMessages(sub => PlayerData.deserialize(sub, level, sub.getTag())));
  }

  clone(): UpdateGameDataPacket {
    const players = new Array(this.players.length);

    for (let i = 0; i < players.length; i++) {
      players[i] = this.players[i].clone();
    }

    return new UpdateGameDataPacket(players);
  }

  serialize(writer: MessageWriter): void {
    for (let i = 0; i < this.players.length; i++) {
      writer.startMessage(this.players[i].getId());
      this.players[i].serialize(writer, false);
      writer.endMessage();
    }
  }
}