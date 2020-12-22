import { MessageReader, MessageWriter } from "../../../util/hazelMessage";
import { RPCPacketType } from "../types/enums";
import { BaseRPCPacket } from ".";

export class StartMeetingPacket extends BaseRPCPacket {
  constructor(
    public readonly victimPlayerId?: number,
  ) {
    super(RPCPacketType.StartMeeting);
  }

  static deserialize(reader: MessageReader): StartMeetingPacket {
    const victimPlayerId = reader.readByte();

    return new StartMeetingPacket(victimPlayerId == 0xff ? undefined : victimPlayerId);
  }

  serialize(): MessageWriter {
    return new MessageWriter().writeByte(this.victimPlayerId ?? 0xff);
  }
}