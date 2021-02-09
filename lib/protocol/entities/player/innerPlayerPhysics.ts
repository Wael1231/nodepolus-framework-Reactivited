import { ClimbLadderPacket, EnterVentPacket, ExitVentPacket } from "../../packets/rpc";
import { GameVentEnteredEvent, GameVentExitedEvent } from "../../../api/events/game";
import { LadderSize, LadderDirection } from "../../packets/rpc/climbLadderPacket";
import { MessageReader, MessageWriter } from "../../../util/hazelMessage";
import { SpawnInnerNetObject } from "../../packets/gameData/types";
import { InnerNetObjectType } from "../types/enums";
import { DataPacket } from "../../packets/gameData";
import { Connection } from "../../connection";
import { BaseInnerNetObject } from "../types";
import { LevelVent } from "../../../types";
import { EntityPlayer } from ".";

export class InnerPlayerPhysics extends BaseInnerNetObject {
  private vent?: LevelVent;

  constructor(
    netId: number,
    public readonly parent: EntityPlayer,
  ) {
    super(InnerNetObjectType.PlayerPhysics, netId, parent);
  }

  getVent(): LevelVent | undefined {
    return this.vent;
  }

  async enterVent(vent: LevelVent, sendTo: Connection[]): Promise<void> {
    const player = this.parent.lobby.findPlayerByNetId(this.netId);

    if (!player) {
      throw new Error(`InnerNetObject ${this.netId} does not have a PlayerInstance on the lobby instance`);
    }

    const event = new GameVentEnteredEvent(
      this.parent.lobby.getGame()!,
      player,
      vent,
    );

    await this.parent.lobby.getServer().emit("game.vent.entered", event);

    if (event.isCancelled()) {
      const connection = player.getConnection();

      if (connection) {
        // TODO: Add delay
        this.sendRpcPacketTo([connection], new ExitVentPacket(vent.id));
      }

      return;
    }

    this.vent = vent;

    this.sendRpcPacketTo(sendTo, new EnterVentPacket(vent.id));
  }

  async exitVent(vent: LevelVent, sendTo: Connection[]): Promise<void> {
    const player = this.parent.lobby.findPlayerByNetId(this.netId);

    if (!player) {
      throw new Error(`InnerNetObject ${this.netId} does not have a PlayerInstance on the lobby instance`);
    }

    const event = new GameVentExitedEvent(
      this.parent.lobby.getGame()!,
      player,
      vent,
    );

    await this.parent.lobby.getServer().emit("game.vent.exited", event);

    if (event.isCancelled()) {
      const connection = player.getConnection();

      if (connection) {
        // TODO: Add delay
        this.sendRpcPacketTo([connection], new ExitVentPacket(vent.id));
      }

      return;
    }

    this.vent = undefined;

    this.sendRpcPacketTo(sendTo, new ExitVentPacket(vent.id));
  }

  climbLadder(ladderSize: LadderSize, ladderDirection: LadderDirection, sendTo: Connection[]): void {
    this.sendRpcPacketTo(sendTo, new ClimbLadderPacket(ladderSize, ladderDirection));
  }

  getData(): DataPacket {
    return new DataPacket(this.netId, new MessageWriter());
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setData(_packet: MessageReader | MessageWriter): void {}

  serializeSpawn(): SpawnInnerNetObject {
    return new SpawnInnerNetObject(
      this.netId,
      new MessageWriter(),
    );
  }

  clone(): InnerPlayerPhysics {
    return new InnerPlayerPhysics(this.netId, this.parent);
  }
}
