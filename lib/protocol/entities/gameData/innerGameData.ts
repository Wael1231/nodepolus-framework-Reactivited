import { SetTasksPacket, UpdateGameDataPacket } from "../../packets/rpc";
import { SpawnInnerNetObject } from "../../packets/gameData/types";
import { MessageWriter } from "../../../util/hazelMessage";
import { InnerNetObjectType } from "../types/enums";
import { DataPacket } from "../../packets/gameData";
import { Connection } from "../../connection";
import { BaseInnerNetObject } from "../types";
import { Tasks } from "../../../static";
import { PlayerData } from "./types";
import { EntityGameData } from ".";

export class InnerGameData extends BaseInnerNetObject {
  constructor(
    netId: number,
    public readonly parent: EntityGameData,
    public readonly players: PlayerData[],
  ) {
    super(InnerNetObjectType.GameData, netId, parent);
  }

  setTasks(playerId: number, taskIds: number[], sendTo: Connection[]): void {
    const tasks = Tasks.forLevelFromId(this.parent.lobby.getLevel(), taskIds);
    const playerIndex = this.players.findIndex(p => p.id == playerId);

    if (playerIndex > -1) {
      const player = this.players[playerIndex];

      player.tasks = new Array(tasks.length);

      for (let j = 0; j < tasks.length; j++) {
        player.tasks[j] = [
          tasks[j],
          false,
        ];
      }
    }

    this.sendRpcPacket(new SetTasksPacket(playerId, taskIds), sendTo);
  }

  updateGameData(playerData: PlayerData[], sendTo: Connection[]): void {
    for (let i = 0; i < playerData.length; i++) {
      let hasPlayer = false;

      for (let j = 0; j < this.players.length; j++) {
        if (this.players[j].id == playerData[i].id) {
          hasPlayer = true;
          this.players[j] = playerData[i];

          break;
        }
      }

      if (!hasPlayer) {
        this.players.push(playerData[i]);
      }
    }

    this.sendRpcPacket(new UpdateGameDataPacket(playerData), sendTo);
  }

  // TODO: compare players and only send those that have updated
  serializeData(): DataPacket {
    return new DataPacket(
      this.netId,
      new MessageWriter().writeList(this.players, (sub, player) => player.serialize(sub), false),
    );
  }

  serializeSpawn(): SpawnInnerNetObject {
    return new SpawnInnerNetObject(
      this.netId,
      new MessageWriter().writeList(this.players, (sub, player) => player.serialize(sub)),
    );
  }

  clone(): InnerGameData {
    return new InnerGameData(this.netId, this.parent, this.players);
  }
}
