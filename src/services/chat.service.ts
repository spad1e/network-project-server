import { ChatRepository } from "@/repositories/chat.repository";
import { IChat } from "@/types/chat";

export class ChatService {
  private chatRepository: ChatRepository;

  constructor() {
    this.chatRepository = new ChatRepository();
  }

  async createChat(body: IChat): Promise<IChat> {
    const createdChat = await this.chatRepository.createChat(body);
    return createdChat;
  }

  async getChats(): Promise<IChat[]> {
    const chats = await this.chatRepository.getChats();
    return chats;
  }

  async getChatsByGroupId(groupId: string): Promise<IChat[]> {
    const chats = await this.chatRepository.getChatsByGroupId(groupId);
    return chats;
  }

  async getChatById(id: string): Promise<IChat | null> {
    const chat = await this.chatRepository.getChatById(id);
    return chat;
  }

  async updateChatById(id: string, body: IChat): Promise<IChat> {
    const updatedChat = await this.chatRepository.updateChatById(id, body);
    return updatedChat;
  }

  async deleteChatById(id: string): Promise<IChat | null> {
    const deletedChat = await this.chatRepository.deleteChatById(id);
    return deletedChat;
  }
}
