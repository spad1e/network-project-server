import { BaseRouter } from "@/routes/baseRouter";
import { DirectChatController } from "@/controllers/directchat.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

export class DirectChatRouter extends BaseRouter {
  private directChatController: DirectChatController;

  constructor() {
    super({
      middleware: [authMiddleware],
    });

    this.directChatController = new DirectChatController();

    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    this.router.get(
      "/",
      this.directChatController.getDirectChats.bind(this.directChatController),
    );
    this.router.get(
      "/:id",
      this.directChatController.getDirectChatById.bind(
        this.directChatController,
      ),
    );
    this.router.get(
      "/user/:user2",
      this.directChatController.getDirectChatByUsers.bind(
        this.directChatController,
      ),
    );
    this.router.post(
      "/",
      this.directChatController.createDirectChat.bind(
        this.directChatController,
      ),
    );
    this.router.put(
      "/:id",
      this.directChatController.updateDirectChatById.bind(
        this.directChatController,
      ),
    );
    this.router.delete(
      "/:id",
      this.directChatController.deleteDirectChatById.bind(
        this.directChatController,
      ),
    );
  }
}
