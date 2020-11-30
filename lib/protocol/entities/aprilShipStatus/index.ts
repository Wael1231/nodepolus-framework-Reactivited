import { SpawnInnerNetObject, SpawnPacket } from "../../packets/rootGamePackets/gameDataPackets/spawn";
import { InnerShipStatus } from "../shipStatus/innerShipStatus";
import { InnerAprilShipStatus } from "./innerAprilShipStatus";
import { ShipStatusInnerNetObjects } from "../shipStatus";
import { SpawnFlag } from "../../../types/spawnFlag";
import { SpawnType } from "../../../types/spawnType";
import { RoomImplementation } from "../types";
import { BaseEntity } from "../baseEntity";

export class EntityAprilShipStatus extends BaseEntity {
  public owner!: number;
  public flags: SpawnFlag = SpawnFlag.None;
  public innerNetObjects!: ShipStatusInnerNetObjects;

  get aprilShipStatus(): InnerShipStatus {
    return this.innerNetObjects[0];
  }

  private constructor(room: RoomImplementation) {
    super(SpawnType.AprilShipStatus, room);
  }

  static spawn(flags: SpawnFlag, owner: number, innerNetObjects: SpawnInnerNetObject[], room: RoomImplementation): EntityAprilShipStatus {
    const aprilShipStatus = new EntityAprilShipStatus(room);

    aprilShipStatus.setSpawn(flags, owner, innerNetObjects);

    return aprilShipStatus;
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

  setSpawn(flags: SpawnFlag, owner: number, innerNetObjects: SpawnInnerNetObject[]): void {
    this.owner = owner;
    this.innerNetObjects = [
      InnerAprilShipStatus.spawn(innerNetObjects[0], this),
    ];
  }
}
