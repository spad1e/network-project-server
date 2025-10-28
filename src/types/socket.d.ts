export interface ServerToClientEvents {
  receive_message: (data: string) => void;
}

export interface ClientToServerEvents {
  join_group: (id: number) => void;
  send_message: (data: string, room: number) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
