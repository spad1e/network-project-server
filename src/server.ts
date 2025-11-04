import "dotenv/config";
import { initSocket } from "@/socket";
import { Server } from "socket.io";
import { corsOptions } from "@/cors";
import { instrument } from "@socket.io/admin-ui";
import path from "path";

import * as moduleAlias from "module-alias";
if (process.env.NODE_ENV !== "development") {
  moduleAlias.addAlias("@", path.join(__dirname));
}

import app from "@/app";
import { Client } from "socket.io/dist/client";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types/socket";

const PORT: string | number = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, { cors: corsOptions });

initSocket(io);
instrument(io, {
  auth: false,
});
