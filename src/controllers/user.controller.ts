import { UserService } from "@/services/user.service";
import { StatusCodes } from "http-status-codes";
import { AppError } from "@/types/error";
import type { Request, Response } from "express";
import type { IUser } from "@/types/user";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const createdUser = await this.userService.createUser(req.body);
      res.status(StatusCodes.CREATED).json(createdUser);
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

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      res.status(StatusCodes.OK).json(users);
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

  async getUserByUsername(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;
      const user = await this.userService.getUserByUsername(username);
      res.status(StatusCodes.OK).json(user);
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

  async updateUserByUsername(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;
      const updatedUser = await this.userService.updateUserByUsername(
        username,
        req.body as IUser
      );
      res.status(StatusCodes.OK).json(updatedUser);
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

  async deleteUserByUsername(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;
      const deletedUser = await this.userService.deleteUserByUsername(username);
      res.status(StatusCodes.OK).json(deletedUser);
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

  async joinGroup(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.params;
      const { groupId } = req.body;
      const group = await this.userService.joinGroup(username, groupId);
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

  async leaveGroup(req: Request, res: Response): Promise<void> {
    try {
      const { username, groupId } = req.params;
      const group = await this.userService.leaveGroup(username, groupId);
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
  async getTokenUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }
      const username = req.user.username;
      const user = await this.userService.getUserByUsername(username);
      res.status(StatusCodes.OK).json(user);
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
