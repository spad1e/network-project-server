import { UserRepository } from "@/repositories/user.repository";
import type { IUser } from "@/types/user";
import type { IGroup } from "@/types/group";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(body: IUser): Promise<IUser> {
    const createdUser = await this.userRepository.createUser(body);
    return createdUser;
  }

  async getUsers(): Promise<IUser[]> {
    const users = await this.userRepository.getUsers();
    return users;
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    const user = await this.userRepository.getUserByUsername(username);
    return user;
  }

  async updateUserByUsername(username: string, body: IUser): Promise<IUser> {
    const updatedUser = await this.userRepository.updateUserByUsername(
      username,
      body
    );
    return updatedUser;
  }

  async deleteUserByUsername(username: string): Promise<IUser> {
    const deletedUser = await this.userRepository.deleteUserByUsername(
      username
    );
    return deletedUser;
  }

  async joinGroup(username: string, groupId: string): Promise<IGroup> {
    const group = await this.userRepository.joinGroup(username, groupId);
    return group;
  }

  async leaveGroup(username: string, groupId: string): Promise<IGroup> {
    const group = await this.userRepository.leaveGroup(username, groupId);
    return group;
  }
}
