import { BaseRouter } from "@/routes/baseRouter";
import { GroupController } from "@/controllers/group.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

export class GroupRouter extends BaseRouter {
  private groupController: GroupController;

  constructor() {
    super({
      middleware: [authMiddleware],
    });
    this.groupController = new GroupController();

    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    this.router.get(
      "/",
      this.groupController.getGroups.bind(this.groupController),
    );
    this.router.get(
      "/user",
      this.groupController.getGroupsByUsername.bind(this.groupController),
    );
    this.router.get(
      "/member/:id",
      this.groupController.getGroupMembersById.bind(this.groupController),
    );
    this.router.get(
      "/:id",
      this.groupController.getGroupById.bind(this.groupController),
    );
    this.router.post(
      "/",
      this.groupController.createGroup.bind(this.groupController),
    );
    this.router.put(
      "/:id",
      this.groupController.updateGroupById.bind(this.groupController),
    );
    this.router.delete(
      "/:id",
      this.groupController.deleteGroupById.bind(this.groupController),
    );
  }
}
