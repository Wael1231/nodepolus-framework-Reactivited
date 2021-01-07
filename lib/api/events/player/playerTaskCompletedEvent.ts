import { PlayerInstance } from "../../player";
import { CancellableEvent } from "../types";
import { LevelTask } from "../../../types";

/**
 * Fired when a player has completed one of their tasks.
 */
export class PlayerTaskCompletedEvent extends CancellableEvent {
  constructor(
    private readonly player: PlayerInstance,
    private readonly taskIndex: number,
    private readonly task: LevelTask,
  ) {
    super();
  }

  getPlayer(): PlayerInstance {
    return this.player;
  }

  getTaskIndex(): number {
    return this.taskIndex;
  }

  getTask(): LevelTask {
    return this.task;
  }
}