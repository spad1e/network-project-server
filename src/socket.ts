// import { Server, Socket } from "socket.io";
// import type {
//   ServerToClientEvents,
//   ClientToServerEvents,
//   InterServerEvents,
//   SocketData,
// } from "@/types/socket";
// import { ChatService } from "@/services/chat.service";

// export const initSocket = (
//   io: Server<
//     ClientToServerEvents,
//     ServerToClientEvents,
//     InterServerEvents,
//     SocketData
//   >
// ) => {
//   io.on(
//     "connection",
//     (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
//       console.log(`New client connected: ${socket.id}`);
//       socket.on("disconnect", () => {
//         console.log(`Client disconnected: ${socket.id}`);
//       });
//       socket.on("join_group", (id: number) => {
//         console.log(`User with ID: ${socket.id} joined the group ${id}`);
//         socket.join(`group_${id}`);
//       });
//       socket.on("send_message", (data: string, room: number) => {
//         // ChatService.sendMessageToGroup(data, room);
//         socket.to(`group_${room}`).emit("receive_message", data);
//       });
//     }
//   );
// };
