import { Router, Request, Response, NextFunction } from "express";

export class BaseRouter {
  public router: Router;

  constructor(
    middleware?: Array<
      (req: Request, res: Response, next: NextFunction) => void
    >
  ) {
    this.router = Router();

    if (middleware) {
      middleware.forEach((middleware) => {
        this.router.use(middleware);
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
