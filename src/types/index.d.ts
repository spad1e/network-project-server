interface User {
  id: string;
  name: string;
}

interface Message {
  senderId: string;
  content: string;
  timestamp: Date;
}

interface Group {
  id: string;
  name: string;
  memberIds: User[];
}
