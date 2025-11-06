import { Server, Socket } from "socket.io";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "@/types/socket";

export const onlineUsers = new Map<string, Set<string>>();

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

  console.log(`User connected: ${user} (Socket ID: ${socket.id})`);

  if (!onlineUsers.has(user)) {
    onlineUsers.set(user, new Set());
  }
  onlineUsers.get(user)!.add(socket.id);
  io.emit("onlineUsers", Array.from(onlineUsers.keys()));

  socket.on("disconnect", () => {
    const user = socket.data.user.username;
    if (!user) return;

    const userSockets = onlineUsers.get(user);
    if (userSockets) {
      userSockets.delete(socket.id);
      if (userSockets.size === 0) {
        onlineUsers.delete(user);
        io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      }
    }
  });
}
