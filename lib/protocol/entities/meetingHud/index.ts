import { SpawnInnerNetObject, SpawnPacket } from "../../packets/rootGamePackets/gameDataPackets/spawn";
import { GLOBAL_OWNER } from "../../../util/constants";
import { SpawnFlag } from "../../../types/spawnFlag";
import { SpawnType } from "../../../types/spawnType";
import { InnerMeetingHud } from "./innerMeetingHud";
import { RoomImplementation } from "../types";
import { BaseEntity } from "../baseEntity";

export type MeetingHudInnerNetObjects = [ InnerMeetingHud ];

export class EntityMeetingHud extends BaseEntity {
  public owner!: number;
  public flags: SpawnFlag = SpawnFlag.None;
  public innerNetObjects!: MeetingHudInnerNetObjects;

  get meetingHud(): InnerMeetingHud {
    return this.innerNetObjects[0];
  }

  constructor(room: RoomImplementation) {
    super(SpawnType.MeetingHud, room);
  }

  static spawn(flags: SpawnFlag, owner: number, innerNetObjects: SpawnInnerNetObject[], room: RoomImplementation): EntityMeetingHud {
    const meetingHud = new EntityMeetingHud(room);

    meetingHud.setSpawn(flags, owner, innerNetObjects);

    return meetingHud;
  }

  getSpawn(): SpawnPacket {
    return new SpawnPacket(
      SpawnType.MeetingHud,
      GLOBAL_OWNER,
      SpawnFlag.None,
      [
        this.meetingHud.spawn(),
      ],
    );
  }

  setSpawn(_flags: SpawnFlag, owner: number, innerNetObjects: SpawnInnerNetObject[]): void {
    this.owner = owner;
    this.innerNetObjects = [
      InnerMeetingHud.spawn(innerNetObjects[0], this),
    ];
  }
}
