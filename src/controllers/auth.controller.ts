import { AuthService } from "@/services/auth.service";
import { AppError } from "@/types/error";
import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
  async signIn(req: Request, res: Response) {
    try {

      const data = await this.authService.signIn(req.body);

      res.cookie("token", data.token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });

      return res.status(StatusCodes.OK).json(data.token);

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
  async signUp(req: Request, res: Response) {
      try{
          console.log("test");
          const user = await this.authService.signUp(req.body);
          res.status(StatusCodes.CREATED).json(user);
          
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
