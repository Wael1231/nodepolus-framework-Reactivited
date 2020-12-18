// import { Level } from "../../../lib/types/level";
import { Player } from "../../../lib/api/player";
import { Server } from "../../../lib/api/server";
import { Room } from "../../../lib/api/room";
import { Logger } from "../../../lib/logger";
// import { CustomHost } from "../../../lib/host";
// import { InternalSystemType } from "../../../lib/protocol/entities/baseShipStatus/systems/type";
// import { HudOverrideSystem } from "../../../lib/protocol/entities/baseShipStatus/systems/hudOverrideSystem";
// import { Text } from "../../../lib/api/text";
import repl from "repl";

declare const server: Server;

const logger = new Logger("Debug");

server.on("room", (room: Room) => {
  room.on("player", (player: Player) => {
    logger.log(player, " Connected");

    player.on("moved", ({ position, velocity }) => {
      logger.log(player, " Moved ", position, " Δ", velocity);
    });
  });
});

repl.start();
