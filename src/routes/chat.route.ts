import { BaseRouter } from "@/routes/baseRouter";
import { ChatController } from "@/controllers/chat.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

export class ChatRouter extends BaseRouter {
  private chatController: ChatController;

  constructor() {
    super({
      middleware: [],
    });

    this.chatController = new ChatController();

    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    this.router.get(
      "/",
      this.chatController.getAllChats.bind(this.chatController),
    );
    this.router.get(
      "/:id",
      this.chatController.getChatById.bind(this.chatController),
    );
    this.router.get(
      "/group/:groupId",
      this.chatController.getChatsByGroupId.bind(this.chatController),
    );
    this.router.post(
      "/",
      this.chatController.createChat.bind(this.chatController),
    );
    this.router.put(
      "/:id",
      this.chatController.updateChatById.bind(this.chatController),
    );
    this.router.delete(
      "/:id",
      this.chatController.deleteChatById.bind(this.chatController),
    );
  }
}
