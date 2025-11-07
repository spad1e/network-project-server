import type { IGroup } from "@/types/group";
import type { IUser } from "@/types/user";
import { Prisma } from "@/libs/prisma";

export class GroupRepository {
  async createGroup(group: IGroup): Promise<IGroup> {
    return await Prisma.group.create({
      data: {
        name: group.name,
        adminUsername: group.adminUsername,
        members: {
          connect: { username: group.adminUsername },
        },
      },
      include: { members: true },
    });
  }

  async getGroups(): Promise<IGroup[]> {
    return await Prisma.group.findMany({
      orderBy: { createdAt: "asc" },
    });
  }

  async getGroupById(id: string): Promise<IGroup | null> {
    return await Prisma.group.findUnique({
      where: { id },
    });
  }

  async getGroupsByUsername(username: string): Promise<IGroup[]> {
    return await Prisma.group.findMany({
      where: {
        members: {
          some: {
            username,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });
  }

  async getGroupMembersById(id: string): Promise<IUser[]> {
    return await Prisma.user.findMany({
      where: {
        groups: {
          some: {
            id,
          },
        },
      },
    });
  }

  async updateGroupById(id: string, group: IGroup): Promise<IGroup> {
    return await Prisma.group.update({
      where: { id },
      data: {
        name: group.name,
        adminUsername: group.adminUsername,
      },
    });
  }

  async deleteGroupById(id: string): Promise<IGroup> {
    return await Prisma.group.delete({
      where: { id },
    });
  }
}
