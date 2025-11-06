import type { IGroupChat } from "@/types/groupchat";
import { Prisma } from "@/libs/prisma";

export class GroupChatRepository {
  async createGroupChat(chat: IGroupChat): Promise<IGroupChat> {
    return await Prisma.groupChat.create({
      data: {
        message: chat.message,
        groupId: chat.groupId,
        username: chat.username,
      },
    });
  }

  async getGroupChats(): Promise<IGroupChat[]> {
    return await Prisma.groupChat.findMany({
      orderBy: { createdAt: "asc" },
    });
  }

  async getGroupChatsByGroupId(groupId: string): Promise<IGroupChat[]> {
    return await Prisma.groupChat.findMany({
      where: { groupId },
      orderBy: { createdAt: "asc" },
    });
  }

  async getGroupChatById(id: string): Promise<IGroupChat | null> {
    return await Prisma.groupChat.findUnique({
      where: { id },
    });
  }

  async updateGroupChatById(id: string, chat: IGroupChat): Promise<IGroupChat> {
    return await Prisma.groupChat.update({
      where: { id },
      data: {
        message: chat.message,
        groupId: chat.groupId,
        username: chat.username,
      },
    });
  }

  async deleteGroupChatById(id: string): Promise<IGroupChat> {
    return await Prisma.groupChat.delete({
      where: { id },
    });
  }
}
