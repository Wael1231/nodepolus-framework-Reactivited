import { BaseInnerNetEntity, LobbyImplementation } from "../types";
import { SpawnInnerNetObject } from "../../packets/gameData/types";
import { SpawnFlag, SpawnType } from "../../../types/enums";
import { SpawnPacket } from "../../packets/gameData";
import { InnerSkeldAprilShipStatus } from ".";

export class EntitySkeldAprilShipStatus extends BaseInnerNetEntity {
  public owner!: number;
  public flags: SpawnFlag = SpawnFlag.None;
  public innerNetObjects!: [ InnerSkeldAprilShipStatus ];

  get aprilShipStatus(): InnerSkeldAprilShipStatus {
    return this.innerNetObjects[0];
  }

  constructor(lobby: LobbyImplementation) {
    super(SpawnType.AprilShipStatus, lobby);
  }

  static spawn(owner: number, flags: SpawnFlag, innerNetObjects: SpawnInnerNetObject[], lobby: LobbyImplementation): EntitySkeldAprilShipStatus {
    const skeldAprilShipStatus = new EntitySkeldAprilShipStatus(lobby);

    skeldAprilShipStatus.setSpawn(owner, flags, innerNetObjects);

    return skeldAprilShipStatus;
  }

  getSpawn(): SpawnPacket {
    return new SpawnPacket(
      this.type,
      this.owner,
      this.flags,
      [
        this.aprilShipStatus.spawn(),
      ],
    );
  }

  setSpawn(owner: number, _flags: SpawnFlag, innerNetObjects: SpawnInnerNetObject[]): void {
    this.owner = owner;
    this.innerNetObjects = [
      InnerSkeldAprilShipStatus.spawn(innerNetObjects[0], this),
    ];
  }
}
