import { Server, Socket } from "socket.io";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "@/types/socket";
import { IGroupChat, IDirectChat } from "@/types/chat";
import { UserService } from "@/services/user.service";
import { onlineUsers } from "@/socket/handlers/connection";

const userService = new UserService();

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
  const user = socket.data.user;
  if (!user) return;

  socket.on("groupMessageToServer", (data: IGroupChat, room: string) => {
    console.log("group message sent to server", data, room);
    socket.to(room).emit("groupMessageToClient", data);
  });
  socket.on(
    "directMessageToServer",
    async (data: IDirectChat, username: string) => {
      console.log("private message sent to server", data, username);
      const user = await userService.getUserByUsername(username);
      if (!user) return;
      const userString = JSON.stringify({
        username: user.username,
        icon_id: user.icon_id,
      });
      const userSocket = onlineUsers.get(userString);
      if (!userSocket) return;
      for (const socketId of userSocket) {
        socket.to(socketId).emit("directMessageToClient", data);
      }
    }
  );
}
