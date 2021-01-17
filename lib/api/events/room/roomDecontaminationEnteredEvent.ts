import { CancellableEvent } from "../types";

/**
 * Fired when a decontamination room's door has opened to let players enter.
 */
export class RoomDecontaminationEnteredEvent extends CancellableEvent {
  constructor(
    private readonly decontamination: number,
    private readonly side: number,

  ) {
    super();
  }

  getDcontamination(): number {
    return this.decontamination;
  }

  getSide(): number {
    return this.side;
  }
}