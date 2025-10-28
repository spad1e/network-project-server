// import bcrypt from "bcrypt";
// import { AuthRepository } from "@/repositories/auth.repository";
// import { StatusCodes } from "http-status-codes";

// import { AppError } from "@/types/error";

// export class AuthService {
//   private authRepository: AuthRepository;

//   constructor() {
//     this.authRepository = new AuthRepository();
//   }

//   async signIn(username: string, password: string) {
//     const user = await this.authRepository.findUserByUsername(username);
//     if (!user) {
//       throw new AppError("User not found", StatusCodes.NOT_FOUND);
//     }

//     const isMatch = password === user.password;
//     if (!isMatch) {
//       throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
//     }

//     return user;
//   }

//   async signUp(username: string, password: string) {}
// }
