import { PlayerColor } from "../../../types/enums";
import { PlayerInstance } from "../../player";
import { CancellableEvent } from "../types";

/**
 * Fired when a player's color has been updated.
 */
export class PlayerColorUpdatedEvent extends CancellableEvent {
  constructor(
    private readonly player: PlayerInstance,
    private readonly oldColor: PlayerColor,
    private newColor: PlayerColor,
  ) {
    super();
  }

  /**
   * Gets the player whose color was updated.
   */
  getPlayer(): PlayerInstance {
    return this.player;
  }

  /**
   * Gets the player's old color.
   */
  getOldColor(): PlayerColor {
    return this.oldColor;
  }

  /**
   * Gets the player's new color.
   */
  getNewColor(): PlayerColor {
    return this.newColor;
  }

  /**
   * Sets the player's new color.
   *
   * @param newColor The player's new color
   */
  setNewColor(newColor: PlayerColor): void {
    this.newColor = newColor;
  }
}
