import { GroupChatService } from "@/services/groupchat.service";
import { StatusCodes } from "http-status-codes";
import { AppError } from "@/types/error";
import type { Request, Response } from "express";
import { IGroupChat } from "@/types/groupchat";

export class GroupChatController {
  private groupChatService: GroupChatService;

  constructor() {
    this.groupChatService = new GroupChatService();
  }

  async createGroupChat(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }
      const username = req.user.username;
      const { groupId, message } = req.body;
      const createdGroupChat = await this.groupChatService.createGroupChat({
        groupId,
        username,
        message,
      } as IGroupChat);
      res.status(StatusCodes.CREATED).json(createdGroupChat);
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

  async getGroupChats(req: Request, res: Response): Promise<void> {
    try {
      const chats = await this.groupChatService.getGroupChats();
      res.status(StatusCodes.OK).json(chats);
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

  async getGroupChatsByGroupId(req: Request, res: Response): Promise<void> {
    try {
      const { groupId } = req.params;
      const chats = await this.groupChatService.getGroupChatsByGroupId(groupId);
      res.status(StatusCodes.OK).json(chats);
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

  async getGroupChatById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const chat = await this.groupChatService.getGroupChatById(id);
      res.status(StatusCodes.OK).json(chat);
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

  async updateGroupChatById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { groupId, username, message } = req.body;
      const updatedChat = await this.groupChatService.updateGroupChatById(id, {
        groupId,
        username,
        message,
      } as IGroupChat);
      res.status(StatusCodes.OK).json(updatedChat);
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

  async deleteGroupChatById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedChat = await this.groupChatService.deleteGroupChatById(id);
      res.status(StatusCodes.OK).json(deletedChat);
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
