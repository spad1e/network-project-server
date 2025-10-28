import { BaseRouter } from "@/routes/baseRouter";
import { GroupController } from "@/controllers/group.controller";

export class GroupRouter extends BaseRouter {
  private groupController: GroupController;

  constructor() {
    super();
    this.groupController = new GroupController();

    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    this.router.get(
      "/",
      this.groupController.getAllGroups.bind(this.groupController)
    );
    this.router.get(
      "/:id",
      this.groupController.getGroupById.bind(this.groupController)
    );
    this.router.get(
      "/user/:username",
      this.groupController.getGroupsByUsername.bind(this.groupController)
    );
    this.router.post(
      "/",
      this.groupController.createGroup.bind(this.groupController)
    );
    this.router.put(
      "/:id",
      this.groupController.updateGroupById.bind(this.groupController)
    );
    this.router.delete(
      "/:id",
      this.groupController.deleteGroupById.bind(this.groupController)
    );
  }
}
