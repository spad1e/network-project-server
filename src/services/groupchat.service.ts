import { GroupChatRepository } from "@/repositories/groupchat.repository";
import { IGroupChat } from "@/types/chat";

export class GroupChatService {
  private groupChatRepository: GroupChatRepository;

  constructor() {
    this.groupChatRepository = new GroupChatRepository();
  }

  async createGroupChat(body: IGroupChat): Promise<IGroupChat> {
    const createdChat = await this.groupChatRepository.createGroupChat(body);
    return createdChat;
  }

  async getGroupChats(): Promise<IGroupChat[]> {
    const chats = await this.groupChatRepository.getGroupChats();
    return chats;
  }

  async getGroupChatsByGroupId(groupId: string): Promise<IGroupChat[]> {
    const chats = await this.groupChatRepository.getGroupChatsByGroupId(
      groupId
    );
    return chats;
  }

  async getGroupChatById(id: string): Promise<IGroupChat | null> {
    const chat = await this.groupChatRepository.getGroupChatById(id);
    return chat;
  }

  async updateGroupChatById(id: string, body: IGroupChat): Promise<IGroupChat> {
    const updatedChat = await this.groupChatRepository.updateGroupChatById(
      id,
      body
    );
    return updatedChat;
  }

  async deleteGroupChatById(id: string): Promise<IGroupChat | null> {
    const deletedChat = await this.groupChatRepository.deleteGroupChatById(id);
    return deletedChat;
  }
}
