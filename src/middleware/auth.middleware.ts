import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";

import { IJWTData } from "@/types/auth";

declare module "express" {
  export interface Request {
    user?: IJWTData;
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const cookies = req.cookies;
  const token = cookies?.token;
  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
  try {
    const jwtData = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = jwtData.user as IJWTData;
    next();
  } catch {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
}
