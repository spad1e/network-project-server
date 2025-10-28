import { BaseRouter } from "@/routes/baseRouter";
import { UserController } from "@/controllers/user.controller";

export class UserRouter extends BaseRouter {
  private userController: UserController;

  constructor() {
    super();
    this.userController = new UserController();

    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    this.router.get(
      "/",
      this.userController.getAllUsers.bind(this.userController)
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
      "/:username",
      this.userController.updateUserByUsername.bind(this.userController)
    );
    this.router.delete(
      "/:username",
      this.userController.deleteUserByUsername.bind(this.userController)
    );
    this.router.post(
      "/joingroup/:username",
      this.userController.joinGroup.bind(this.userController)
    );
    this.router.post(
      "/leavegroup/:username",
      this.userController.leaveGroup.bind(this.userController)
    );
  }
}
