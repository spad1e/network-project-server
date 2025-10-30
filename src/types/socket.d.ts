export interface ServerToClientEvents {
  messageToClient: (data: IChat) => void;
}

export interface ClientToServerEvents {
  join_group: (id: string) => void;
  leave_group: (id: string) => void;
  messageToServer: (data: IChat, room: string) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
