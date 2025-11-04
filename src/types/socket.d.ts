import { IChat } from "@/types/chat";

export interface ServerToClientEvents {
  messageToClient: (data: IChat) => void;
  onlineUsers: (users: string[]) => void;
  userConnect: (username: string) => void;
  userDisconnect: (username: string) => void;
}

export interface ClientToServerEvents {
  joinGroup: (id: string) => void;
  leaveGroup: (id: string) => void;
  messageToServer: (data: IChat, room: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  user: { username: string };
}
