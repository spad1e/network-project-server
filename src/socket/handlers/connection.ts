import { Server, Socket } from "socket.io";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "@/types/socket";
import { IUser } from "@/types/user";

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
  >,
) {
  const user = socket.data.user;
  if (!user) return;
  const userString = JSON.stringify(user);

  console.log(`User connected: ${userString} (Socket ID: ${socket.id})`);

  if (!onlineUsers.has(userString)) {
    onlineUsers.set(userString, new Set());
  }
  onlineUsers.get(userString)!.add(socket.id);
  console.log(onlineUsers);
  socket.emit(
    "onlineUsers",
    Array.from(onlineUsers.keys()).map((u) => JSON.parse(u) as Partial<IUser>),
  );
  socket.broadcast.emit(
    "onlineUsers",
    Array.from(onlineUsers.keys()).map((u) => JSON.parse(u) as Partial<IUser>),
  );

  socket.on("disconnect", () => {
    const user = socket.data.user;
    if (!user) return;
    const userString = JSON.stringify(user);

    const userSockets = onlineUsers.get(userString);
    if (userSockets) {
      userSockets.delete(socket.id);
      if (userSockets.size === 0) {
        onlineUsers.delete(userString);
        io.emit(
          "onlineUsers",
          Array.from(onlineUsers.keys()).map(
            (u) => JSON.parse(u) as Partial<IUser>,
          ),
        );
      }
    }
  });
}
