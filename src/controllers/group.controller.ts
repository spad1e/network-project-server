import { GroupService } from "@/services/group.service";
import { StatusCodes } from "http-status-codes";
import { AppError } from "@/types/error";
import type { Request, Response } from "express";
import type { IGroup } from "@/types/group";
import { IUser } from "@/types/user";

export class GroupController {
  private groupService: GroupService;

  constructor() {
    this.groupService = new GroupService();
  }

  async createGroup(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      if (!req.user) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }

      const adminUsername = req.user.username;
      const createdGroup = await this.groupService.createGroup({
        name,
        adminUsername,
      } as IGroup);
      res.status(StatusCodes.CREATED).json(createdGroup);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
        return;
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  async getGroups(req: Request, res: Response): Promise<void> {
    try {
      const groups = await this.groupService.getGroups();
      res.status(StatusCodes.OK).json(groups);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
        return;
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  async getGroupMembersById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const group_members = await this.groupService.getGroupMembersById(id);
      res.status(StatusCodes.OK).json(group_members);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
        return;
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  async getGroupById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const group = await this.groupService.getGroupById(id);
      res.status(StatusCodes.OK).json(group);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
        return;
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  async getGroupsByUsername(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }
      const username = req.user.username;
      const groups = await this.groupService.getGroupsByUsername(username);
      res.status(StatusCodes.OK).json(groups);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
        return;
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  async updateGroupById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedGroup = await this.groupService.updateGroupById(
        id,
        req.body as IGroup
      );
      res.status(StatusCodes.OK).json(updatedGroup);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
        return;
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }

  async deleteGroupById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedGroup = await this.groupService.deleteGroupById(id);
      res.status(StatusCodes.OK).json(deletedGroup);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        res
          .status(error.statusCode)
          .json({ success: false, error: error.message });
        return;
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  }
}
