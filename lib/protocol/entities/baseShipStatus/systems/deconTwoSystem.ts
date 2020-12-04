import { MessageReader, MessageWriter } from "../../../../util/hazelMessage";
import { SystemType } from "../../../../types/systemType";
import { DecontaminationDoorState } from "./deconSystem";
import { BaseSystem } from "./baseSystem";

export class DeconTwoSystem extends BaseSystem<DeconTwoSystem> {
  public timer = 0;
  public state: DecontaminationDoorState = DecontaminationDoorState.Idle;

  constructor() {
    super(SystemType.Decontamination2);
  }

  static spawn(data: MessageReader): DeconTwoSystem {
    const deconSystem = new DeconTwoSystem();

    deconSystem.setSpawn(data);

    return deconSystem;
  }

  getData(): MessageWriter {
    return this.getSpawn();
  }

  setData(data: MessageReader): void {
    this.setSpawn(data);
  }

  getSpawn(): MessageWriter {
    return new MessageWriter().writeByte(this.timer)
      .writeByte(this.state);
  }

  setSpawn(data: MessageReader): void {
    this.timer = data.readByte();
    this.state = data.readByte();
  }

  equals(old: DeconTwoSystem): boolean {
    if (this.timer != old.timer) {
      return false;
    }

    if (this.state != old.state) {
      return false;
    }

    return true;
  }
}