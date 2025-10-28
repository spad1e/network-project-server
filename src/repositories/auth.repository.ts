// import type { IUser } from "@/types/user";
// import { Prisma } from "@/libs/prisma";

// export class AuthRepository {
//   async findUserByUsername(username: string): Promise<IUser | null> {
//     return await Prisma.user.findFirst({
//       where: { username },
//     });
//   }

//   async createUser(user: IUser): Promise<IUser> {
//     return await Prisma.user.create({
//       data: {
//         username: user.username,
//         password: user.password,
//       },
//     });
//   }
// }
