import { Server, Socket } from "socket.io";

export const initSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`New client connected: ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
    socket.on("join_group", (id: number) => {
      console.log(`User with ID: ${socket.id} joined the group ${id}`);
      socket.join(`group_${id}`);
    });
    socket.on("send_message", (data: string, room: number) => {
      console.log(`Message from ${socket.id} to room ${room}: ${data}`);
      socket.to(`group_${room}`).emit("receive_message", data);
    });
  });
};
