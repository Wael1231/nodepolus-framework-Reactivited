import { MessageReader, MessageWriter } from "../../../util/hazelMessage";
import { HazelPacketType } from "../types/enums";
import { BaseHazelPacket } from ".";
import { Bitfield } from "../../../types";

export class AcknowledgementPacket extends BaseHazelPacket {
  constructor(public missingPackets: Bitfield) {
    super(HazelPacketType.Acknowledgement);
  }

  static deserialize(reader: MessageReader): AcknowledgementPacket {
    return new AcknowledgementPacket(Bitfield.fromNumber(reader.readByte(), 8));
  }

  serialize(): MessageWriter {
    return new MessageWriter().writeByte(this.missingPackets.toNumber());
  }
}