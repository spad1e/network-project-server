import { Router } from "express";
import { GroupRouter } from "@/routes/group.route";
import { UserRouter } from "@/routes/user.route";
import { GroupChatRouter } from "@/routes/groupchat.route";
import { DirectChatRouter } from "@/routes/directchat.route";
import { AuthRouter } from "@/routes/auth.route";

export class RouterManager {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    const groupRouter = new GroupRouter();
    const userRouter = new UserRouter();
    const groupChatRouter = new GroupChatRouter();
    const directChatRouter = new DirectChatRouter();
    const authRouter = new AuthRouter();

    this.router.use("/api/group", groupRouter.getRouter());
    this.router.use("/api/user", userRouter.getRouter());
    this.router.use("/api/groupchat", groupChatRouter.getRouter());
    this.router.use("/api/directchat", directChatRouter.getRouter());
    this.router.use("/api/auth", authRouter.getRouter());
  }

  public getRouter(): Router {
    return this.router;
  }
}
