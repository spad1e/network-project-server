import { Router, Request, Response, NextFunction } from "express";

interface BaseRouterProps {
  middleware?: Array<(req: Request, res: Response, next: NextFunction) => void>;
}

export class BaseRouter {
  public router: Router;
  constructor({
    middleware
  }: BaseRouterProps) {
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
