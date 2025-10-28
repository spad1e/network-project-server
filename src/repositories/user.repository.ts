import type { IUser } from "@/types/user";
import { Prisma } from "@/libs/prisma";
import { IGroup } from "@/types/group";

export class UserRepository {
  async createUser(user: IUser): Promise<IUser> {
    return await Prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
      },
    });
  }

  async getUsers(): Promise<IUser[]> {
    return await Prisma.user.findMany();
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    return await Prisma.user.findUnique({
      where: { username },
    });
  }

  async updateUserByUsername(username: string, user: IUser): Promise<IUser> {
    return await Prisma.user.update({
      where: { username },
      data: {
        username: user.username,
        password: user.password,
      },
    });
  }

  async deleteUserByUsername(username: string): Promise<IUser> {
    return await Prisma.user.delete({
      where: { username },
    });
  }

  async joinGroup(username: string, groupId: string): Promise<IGroup> {
    const group = await Prisma.group.findUnique({
      where: { id: groupId },
    });
    if (!group) {
      throw new Error("Group not found");
    }
    await Prisma.user.update({
      where: { username },
      data: {
        groups: {
          connect: { id: groupId },
        },
      },
    });
    return group;
  }

  async leaveGroup(username: string, groupId: string): Promise<IGroup> {
    const group = await Prisma.group.findUnique({
      where: { id: groupId },
    });
    if (!group) {
      throw new Error("Group not found");
    }
    await Prisma.user.update({
      where: { username },
      data: {
        groups: {
          disconnect: { id: groupId },
        },
      },
    });
    return group;
  }
}
