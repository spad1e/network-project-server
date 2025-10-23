export interface ServerToClientEvents {
  newMessage: (message: Message) => void;
  userJoined: (user: User) => void;
  userLeft: (userId: string) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userId: string;
  message: string;
}
