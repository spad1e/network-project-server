import { PrismaClient } from "@/generated/prisma/client";
import dotenv from "dotenv";

class PrismaManager {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaManager.instance) {
      if (process.env.NODE_ENV === "development") {
        PrismaManager.instance = new PrismaClient({
          log: ["query", "warn", "error"],
        });
      } else {
        PrismaManager.instance = new PrismaClient({
          log: ["warn", "error"],
        });
      }
    }
    return PrismaManager.instance;
  }
}

export const Prisma = PrismaManager.getInstance();
