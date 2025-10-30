import { Server, Socket } from "socket.io";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "@/types/socket";
import { IChat } from "./types/chat";

export const initSocket = (
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
) => {
  io.on(
    "connection",
    (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
      console.log(`New client connected: ${socket.id}`);
      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
      socket.on("join_group", (id: string) => {
        console.log(`Client ${socket.id} joining group: ${id}`);
        socket.join(id);
      });
      socket.on("leave_group", (id: string) => {
        console.log(`Client ${socket.id} leaving group: ${id}`);
        socket.leave(id);
      });
      socket.on("messageToServer", (data: IChat, room: string) => {
        console.log(
          `Message from ${socket.id} to room ${room}: ${data.message}`,
        );
        socket.to(room).emit("messageToClient", data);
      });
    },
  );
};
