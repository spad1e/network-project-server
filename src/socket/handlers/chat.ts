import { Server, Socket } from "socket.io";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "@/types/socket";
import { IChat } from "@/types/chat";

export function registerChatHandlers(
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >
) {
  const user = socket.data.user.username;
  if (!user) return;

  socket.on("joinGroup", (id: string) => {
    socket.join(id);
  });
  socket.on("leaveGroup", (id: string) => {
    socket.leave(id);
  });
  socket.on("messageToServer", (data: IChat, room: string) => {
    socket.to(room).emit("messageToClient", data);
  });
}
