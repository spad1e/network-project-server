import { Server, Socket } from "socket.io";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "@/types/socket";
import { socketMiddleware } from "@/middleware/socket.middleware";
import { registerConnectionHandlers } from "@/socket/handlers/connection";
import { registerChatHandlers } from "@/socket/handlers/chat";

export const initSocket = (
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) => {
  io.use(socketMiddleware);

  io.on("connection", (socket: Socket) => {
    registerConnectionHandlers(io, socket);
    registerChatHandlers(io, socket);
  });
};
