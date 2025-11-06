import type { IDirectChat } from "@/types/directchat";
import { Prisma } from "@/libs/prisma";

export class DirectChatRepository {
  async createDirectChat(directchat: IDirectChat): Promise<IDirectChat> {
    return await Prisma.directChat.create({
      data: {
        message: directchat.message,
        sender: directchat.sender,
        receiver: directchat.receiver,
      },
    });
  }

  async getDirectChats(): Promise<IDirectChat[]> {
    return await Prisma.directChat.findMany({
      orderBy: { createdAt: "asc" },
    });
  }

  async getDirectChatsByUsers(
    user1: string,
    user2: string
  ): Promise<IDirectChat[]> {
    return await Prisma.directChat.findMany({
      where: {
        OR: [
          { sender: user1, receiver: user2 },
          { sender: user2, receiver: user1 },
        ],
      },
      orderBy: { createdAt: "asc" },
    });
  }

  async getDirectChatById(id: string): Promise<IDirectChat | null> {
    return await Prisma.directChat.findUnique({
      where: { id },
    });
  }

  async updateDirectChatById(
    id: string,
    chat: IDirectChat
  ): Promise<IDirectChat> {
    return await Prisma.directChat.update({
      where: { id },
      data: {
        message: chat.message,
        sender: chat.sender,
        receiver: chat.receiver,
      },
    });
  }

  async deleteDirectChatById(id: string): Promise<IDirectChat> {
    return await Prisma.directChat.delete({
      where: { id },
    });
  }
}
