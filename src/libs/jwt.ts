import jwt, { JwtPayload } from "jsonwebtoken";

import { IJwtData } from "@/types/jwt";

export function signJwt(username: string, icon_id: number): string {
  const payload = { username, icon_id };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "48h",
  });
  return token;
}

export function verifyJwt(token: string): IJwtData {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as JwtPayload;
  const { username, icon_id } = decoded;
  return { username, icon_id } as IJwtData;
}
