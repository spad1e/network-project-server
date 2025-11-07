export interface IDirectChat {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  createdAt: Date;
}

export interface IGroupChat {
  id: string;
  message: string;
  groupId: string;
  username: string;
  createdAt: Date;
}
