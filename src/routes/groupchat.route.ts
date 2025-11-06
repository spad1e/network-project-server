import { BaseRouter } from "@/routes/baseRouter";
import { GroupChatController } from "@/controllers/groupchat.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

export class GroupChatRouter extends BaseRouter {
  private groupChatController: GroupChatController;

  constructor() {
    super({
      middleware: [authMiddleware],
    });

    this.groupChatController = new GroupChatController();

    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    this.router.get(
      "/",
      this.groupChatController.getGroupChats.bind(this.groupChatController)
    );
    this.router.get(
      "/:id",
      this.groupChatController.getGroupChatById.bind(this.groupChatController)
    );
    this.router.get(
      "/group/:groupId",
      this.groupChatController.getGroupChatsByGroupId.bind(
        this.groupChatController
      )
    );
    this.router.post(
      "/",
      this.groupChatController.createGroupChat.bind(this.groupChatController)
    );
    this.router.put(
      "/:id",
      this.groupChatController.updateGroupChatById.bind(
        this.groupChatController
      )
    );
    this.router.delete(
      "/:id",
      this.groupChatController.deleteGroupChatById.bind(
        this.groupChatController
      )
    );
  }
}
