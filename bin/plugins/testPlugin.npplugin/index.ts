import { Level } from "../../../lib/types/level";
import { Player } from "../../../lib/api/player";
import { Server } from "../../../lib/api/server";
import { Room } from "../../../lib/api/room";
import { Logger } from "../../../lib/logger";

declare const server: Server;

const logger = new Logger("Debug");

server.on("room", (room: Room) => {
  room.on("player", (player: Player) => {
    logger.log(player, " Connected");

    player.on("spawned", () => {
      logger.log(player, " Spawned");

      room.settings.setLevel(Level.Airship);
    });

    player.on("moved", ({ position, velocity }) => {
      logger.log(player, " Moved ", position, " Δ", velocity);
    });
  });
});
