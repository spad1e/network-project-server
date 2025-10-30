import bcrypt from "bcrypt";
import { AuthRepository } from "@/repositories/auth.repository";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { AppError } from "@/types/error";

import { IUser } from "@/types/user";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async signIn(body: IUser) {
    if (!body.username || !body.password) {
      throw new AppError("No Username or password", StatusCodes.BAD_REQUEST);
    }

    const user = await this.authRepository.findUserByUsername(body.username);
    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
    }

    const payload = { user };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });
    return { user, token };
  }

  async signUp(body: IUser) {
    if (!body.username || !body.password) {
      throw new AppError("No Username or password", StatusCodes.BAD_REQUEST);
    }
    const existingUser = await this.authRepository.findUserByUsername(
      body.username
    );
    if (existingUser) {
      throw new AppError("This Account Already exist", StatusCodes.CONFLICT);
    }
    const createUser = await this.authRepository.createUser({
      username: body.username,
      password: await this.hashPassword(body.password),
    } as IUser);
    if (!createUser) {
      throw new AppError(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    return createUser;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS as string, 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
