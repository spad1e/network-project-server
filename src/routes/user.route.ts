import { BaseRouter } from "@/routes/baseRouter";
import { UserController } from "@/controllers/user.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

export class UserRouter extends BaseRouter {
  private userController: UserController;

  constructor() {
    super({
      middleware: [authMiddleware],
    });
    this.userController = new UserController();

    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    this.router.get(
      "/token",
      this.userController.getTokenUser.bind(this.userController)
    );
    this.router.get(
      "/",
      this.userController.getUsers.bind(this.userController)
    );
    this.router.get(
      "/:id",
      this.userController.getUserByUsername.bind(this.userController)
    );
    this.router.post(
      "/",
      this.userController.createUser.bind(this.userController)
    );
    this.router.put(
      "/",
      this.userController.updateUserByUsername.bind(this.userController)
    );
    this.router.delete(
      "/",
      this.userController.deleteUserByUsername.bind(this.userController)
    );
    this.router.post(
      "/joingroup",
      this.userController.joinGroup.bind(this.userController)
    );
    this.router.post(
      "/leavegroup/:username",
      this.userController.leaveGroup.bind(this.userController)
    );
  }
}
