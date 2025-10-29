import { BaseRouter } from "./baseRouter";
import { AuthController } from "@/controllers/auth.controller";

export class AuthRouter extends BaseRouter{
    private authController: AuthController;

    constructor(){
        super({
            middleware:[]
        });
        this.authController = new AuthController();
        this.setUpRoutes();
    }
    private setUpRoutes(): void {
        this.router.post(
            '/signup', 
            this.authController.signUp.bind(this.authController)
        );
        this.router.post(
            '/signin',
            this.authController.signIn.bind(this.authController)
        );
    }


}