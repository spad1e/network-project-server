import { Router } from "express";
import { GroupRouter } from "@/routes/group.route";
import { UserRouter } from "@/routes/user.route";
import { ChatRouter } from "./chat.route";
import { AuthRouter } from "./auth.route";

export class RouterManager {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRouters();
  }

  private initializeRouters(): void {
    const groupRouter = new GroupRouter();
    const userRouter = new UserRouter();
    const chatRouter = new ChatRouter();
    const authRouter = new AuthRouter();

    this.router.use("/api/group", groupRouter.getRouter());
    this.router.use("/api/user", userRouter.getRouter());
    this.router.use("/api/chat", chatRouter.getRouter());
    this.router.use("/api/auth", authRouter.getRouter());
  }

  public getRouter(): Router {
    return this.router;
  }
}
