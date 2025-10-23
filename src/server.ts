import "dotenv/config";
import path from "path";
import { initSocket } from "@/sockets/index";
import { Server } from "socket.io";
import { corsOptions } from "@/app";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@/types/socket";

import moduleAlias from "module-alias";
if (process.env.NODE_ENV !== "development") {
  moduleAlias.addAlias("@", path.join(__dirname));
}
import { instrument } from "@socket.io/admin-ui";

import app from "@/app";

const PORT: string | number = process.env.PORT || 3000;

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(3030, { cors: corsOptions });

initSocket(io);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

instrument(io, { auth: false });
