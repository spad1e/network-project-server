import bcrypt from "bcrypt";
import { UserRepository } from "@/repositories/user.repository";
import { StatusCodes } from "http-status-codes";

import { AppError } from "@/types/error";

import { IUser } from "@/types/user";
import { signJwt } from "@/libs/jwt";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signIn(body: IUser) {
    const { username, password } = body;
    if (!username || !password) {
      throw new AppError("No Username or password", StatusCodes.BAD_REQUEST);
    }

    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
    }

    const token = signJwt(username, user.icon_id);
    return { user, token };
  }

  async signUp(body: IUser) {
    const { username, icon_id, password } = body;
    if (!username || !password) {
      throw new AppError("No Username or password", StatusCodes.BAD_REQUEST);
    }
    const existingUser = await this.userRepository.getUserByUsername(username);
    if (existingUser) {
      throw new AppError("This Account Already exist", StatusCodes.CONFLICT);
    }
    const createUser = await this.userRepository.createUser({
      username: username,
      icon_id: icon_id,
      password: await this.hashPassword(password),
    } as IUser);
    if (!createUser) {
      throw new AppError(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR,
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
