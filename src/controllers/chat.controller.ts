import { ChatService } from "@/services/chat.service";
import { StatusCodes } from "http-status-codes";
import { AppError } from "@/types/error";
import type { Request, Response } from "express";
import { IChat } from "@/types/chat";

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  async createChat(req: Request, res: Response): Promise<void> {
    try {
      const { groupId, username, message } = req.body;
      const createdChat = await this.chatService.createChat({
        groupId,
        username,
        message,
      } as IChat);
      res.status(StatusCodes.CREATED).json(createdChat);
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

  async getAllChats(req: Request, res: Response): Promise<void> {
    try {
      const chats = await this.chatService.getChats();
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

  async getChatsByGroupId(req: Request, res: Response): Promise<void> {
    try {
      const { groupId } = req.params;
      const chats = await this.chatService.getChatsByGroupId(groupId);
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

  async getChatById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const chat = await this.chatService.getChatById(id);
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

  async updateChatById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { groupId, username, message } = req.body;
      const updatedChat = await this.chatService.updateChatById(id, {
        groupId,
        username,
        message,
      } as IChat);
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

  async deleteChatById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedChat = await this.chatService.deleteChatById(id);
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
