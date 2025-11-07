import { Server, Socket } from "socket.io";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from "@/types/socket";
import { GroupService } from "@/services/group.service";

export const onlineUsers = new Map<string, Set<string>>();

const groupService = new GroupService();

export async function registerGroupHandlers(
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
  if (!user.username) return;

  const groups = await groupService.getGroupsByUsername(user.username);
  for (const group of groups) {
    if (group.id) {
      socket.join(group.id);
    }
  }

  socket.on("joinGroup", (id: string) => {
    socket.join(id);
  });
  socket.on("leaveGroup", (id: string) => {
    socket.leave(id);
  });
}
