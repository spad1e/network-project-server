import { DirectChatRepository } from "@/repositories/directchat.repository";
import { IDirectChat } from "@/types/chat";

export class DirectChatService {
  private directChatRepository: DirectChatRepository;

  constructor() {
    this.directChatRepository = new DirectChatRepository();
  }

  async createDirectChat(body: IDirectChat): Promise<IDirectChat> {
    const createdDirectChat = await this.directChatRepository.createDirectChat(
      body
    );
    return createdDirectChat;
  }

  async getDirectChats(): Promise<IDirectChat[]> {
    const directChats = await this.directChatRepository.getDirectChats();
    return directChats;
  }

  async getDirectChatByUsers(
    user1: string,
    user2: string
  ): Promise<IDirectChat[]> {
    const directChats = await this.directChatRepository.getDirectChatsByUsers(
      user1,
      user2
    );
    return directChats;
  }

  async getDirectChatById(id: string): Promise<IDirectChat | null> {
    const directChat = await this.directChatRepository.getDirectChatById(id);
    return directChat;
  }

  async updateDirectChatById(
    id: string,
    body: IDirectChat
  ): Promise<IDirectChat> {
    const updatedDirectChat =
      await this.directChatRepository.updateDirectChatById(id, body);
    return updatedDirectChat;
  }

  async deleteDirectChatById(id: string): Promise<IDirectChat | null> {
    const deletedDirectChat =
      await this.directChatRepository.deleteDirectChatById(id);
    return deletedDirectChat;
  }
}
