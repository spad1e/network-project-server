import { Socket } from "socket.io";
import { verifyJwt } from "@/libs/jwt";
import type {
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
  ServerToClientEvents,
} from "@/types/socket";

export function socketMiddleware(
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  next: (err?: Error) => void
): void {
  try {
    console.log(socket.id);
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    const jwtData = verifyJwt(token || "");
    if (!jwtData) {
      throw new Error("Unauthorized");
    }

    socket.data.user = jwtData;

    console.log("Socket authenticated:", socket.data.user);

    next();
  } catch (error: unknown) {
    next(new Error(String(error)));
  }
}
