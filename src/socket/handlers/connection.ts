import { Server, Socket } from "socket.io";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "@/types/socket";

const onlineUsers = new Map<string, Set<string>>();

export function registerConnectionHandlers(
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

  socket.emit("onlineUsers", Array.from(onlineUsers.keys()));
  if (!onlineUsers.has(user)) {
    onlineUsers.set(user, new Set());
    io.emit("userConnect", user);
  }
  onlineUsers.get(user)!.add(socket.id);

  socket.on("disconnect", () => {
    const user = socket.data.user.username;
    if (!user) return;

    const userSockets = onlineUsers.get(user);
    if (userSockets) {
      userSockets.delete(socket.id);
      if (userSockets.size === 0) {
        onlineUsers.delete(user);
        io.emit("userDisconnect", user);
      }
    }
  });
}
