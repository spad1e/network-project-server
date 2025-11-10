import { DirectChatService } from "@/services/directchat.service";
import { StatusCodes } from "http-status-codes";
import { AppError } from "@/types/error";
import type { Request, Response } from "express";
import { IDirectChat } from "@/types/chat";

export class DirectChatController {
  private directChatService: DirectChatService;

  constructor() {
    this.directChatService = new DirectChatService();
  }

  async createDirectChat(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }
      const sender = req.user.username;
      const { receiver, message } = req.body;
      const createdDirectChat = await this.directChatService.createDirectChat({
        sender,
        receiver,
        message,
      } as IDirectChat);
      res.status(StatusCodes.CREATED).json(createdDirectChat);
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

  async getDirectChats(req: Request, res: Response): Promise<void> {
    try {
      const directChats = await this.directChatService.getDirectChats();
      res.status(StatusCodes.OK).json(directChats);
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

  async getDirectChatByUsers(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }
      const user1 = req.user.username;
      const { user2 } = req.params;
      const directChat = await this.directChatService.getDirectChatByUsers(
        user1,
        user2,
      );
      res.status(StatusCodes.OK).json(directChat);
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

  async getDirectChatById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const directChat = await this.directChatService.getDirectChatById(id);
      res.status(StatusCodes.OK).json(directChat);
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

  async updateDirectChatById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { user1, user2, message } = req.body;
      const updatedDirectChat =
        await this.directChatService.updateDirectChatById(id, {
          sender: user1,
          receiver: user2,
          message,
        } as IDirectChat);
      res.status(StatusCodes.OK).json(updatedDirectChat);
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

  async deleteDirectChatById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedDirectChat =
        await this.directChatService.deleteDirectChatById(id);
      res.status(StatusCodes.OK).json(deletedDirectChat);
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
