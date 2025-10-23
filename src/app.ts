// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import express from "express";
// import { StatusCodes } from "http-status-codes";

import type { Express } from "express";

const allowedOrigins = ["http://localhost:3000", "https://admin.socket.io"];

export const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allowed?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app: Express = express();

// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.path}`);
//   next();
// });

// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(bodyParser.json());

// app.get("/healthz", (req, res) => {
//   res.status(StatusCodes.OK).json({
//     status: "OK",
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//   });
// });

export default app;

// import express from "express";
// import type { Express } from "express";

// const app: Express = express();

// export default app;
