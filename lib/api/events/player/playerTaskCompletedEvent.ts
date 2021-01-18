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

  /**
   * Gets the player that completed a task.
   */
  getPlayer(): PlayerInstance {
    return this.player;
  }

  /**
   * Gets the index of the task that was completed from the player's task list.
   */
  getTaskIndex(): number {
    return this.taskIndex;
  }

  /**
   * Gets the task that was completed.
   */
  getTask(): LevelTask {
    return this.task;
  }
}
