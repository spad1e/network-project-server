import { GroupRepository } from "@/repositories/group.repository";
import type { IGroup } from "@/types/group";

export class GroupService {
  private groupRepository: GroupRepository;

  constructor() {
    this.groupRepository = new GroupRepository();
  }

  async createGroup(body: IGroup): Promise<IGroup> {
    const createdGroup = await this.groupRepository.createGroup(body);
    return createdGroup;
  }

  async getGroups(): Promise<IGroup[]> {
    const groups = await this.groupRepository.getGroups();
    return groups;
  }

  async getGroupById(id: string): Promise<IGroup | null> {
    const group = await this.groupRepository.getGroupById(id);
    return group;
  }

  async getGroupsByUsername(username: string): Promise<IGroup[]> {
    const groups = await this.groupRepository.getGroupsByUsername(username);
    return groups;
  }

  async updateGroupById(id: string, body: IGroup): Promise<IGroup> {
    const updatedGroup = await this.groupRepository.updateGroupById(id, body);
    return updatedGroup;
  }

  async deleteGroupById(id: string): Promise<IGroup> {
    const deletedGroup = await this.groupRepository.deleteGroupById(id);
    return deletedGroup;
  }
}
