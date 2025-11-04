import jwt, { JwtPayload } from "jsonwebtoken";

import { IJwtData } from "@/types/jwt";

export function signJwt(username: string): string {
  const payload = { username };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "48h",
  });
  return token;
}

export function verifyJwt(token: string): IJwtData {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;
  return decoded as IJwtData;
}
