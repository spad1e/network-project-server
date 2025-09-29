import express from "express";
import type { Express } from "express";
import { StatusCodes } from "http-status-codes";

const app: Express = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});
app.use(express.json());

app.get("/healthz", (req, res) => {
  res.status(StatusCodes.OK).send("OK");
});

export default app;
