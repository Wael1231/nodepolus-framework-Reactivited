import { BaseInnerNetEntity, LobbyImplementation } from "../types";
import { SpawnInnerNetObject } from "../../packets/gameData/types";
import { SpawnFlag, SpawnType } from "../../../types/enums";
import { SpawnPacket } from "../../packets/gameData";
import { InnerSkeldShipStatus } from ".";

export class EntitySkeldShipStatus extends BaseInnerNetEntity {
  public owner!: number;
  public flags: SpawnFlag = SpawnFlag.None;
  public innerNetObjects!: [ InnerSkeldShipStatus ];

  get shipStatus(): InnerSkeldShipStatus {
    return this.innerNetObjects[0];
  }

  constructor(lobby: LobbyImplementation) {
    super(SpawnType.ShipStatus, lobby);
  }

  static spawn(owner: number, flags: SpawnFlag, innerNetObjects: SpawnInnerNetObject[], lobby: LobbyImplementation): EntitySkeldShipStatus {
    const shipStatus = new EntitySkeldShipStatus(lobby);

    shipStatus.setSpawn(owner, flags, innerNetObjects);

    return shipStatus;
  }

  getSpawn(): SpawnPacket {
    return new SpawnPacket(
      this.type,
      this.owner,
      this.flags,
      [
        this.shipStatus.spawn(),
      ],
    );
  }

  setSpawn(owner: number, _flags: SpawnFlag, innerNetObjects: SpawnInnerNetObject[]): void {
    this.owner = owner;
    this.innerNetObjects = [
      InnerSkeldShipStatus.spawn(innerNetObjects[0], this),
    ];
  }
}
