import type { IChat } from "@/types/chat";
import { Prisma } from "@/libs/prisma";

export class ChatRepository {
  async createChat(chat: IChat): Promise<IChat> {
    return await Prisma.chat.create({
      data: {
        message: chat.message,
        groupId: chat.groupId,
        username: chat.username,
      },
    });
  }

  async getChats(): Promise<IChat[]> {
    return await Prisma.chat.findMany({
      orderBy: { createdAt: "asc" },
    });
  }

  async getChatsByGroupId(groupId: string): Promise<IChat[]> {
    return await Prisma.chat.findMany({
      where: { groupId },
      orderBy: { createdAt: "asc" },
    });
  }

  async getChatById(id: string): Promise<IChat | null> {
    return await Prisma.chat.findUnique({
      where: { id },
    });
  }

  async updateChatById(id: string, chat: IChat): Promise<IChat> {
    return await Prisma.chat.update({
      where: { id },
      data: {
        message: chat.message,
        groupId: chat.groupId,
        username: chat.username,
      },
    });
  }

  async deleteChatById(id: string): Promise<IChat> {
    return await Prisma.chat.delete({
      where: { id },
    });
  }
}
