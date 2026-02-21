import { Response } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { envVars } from "../app/config/env";

export const generateToken = (userId: JwtPayload, res: Response) => {
  const JWT_ACCESS_SECRET = envVars.JWT_ACCESS_SECRET;
  const JWT_ACCESS_EXPIRES = envVars.JWT_ACCESS_EXPIRES;

  if (!JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is not configured");
  }

  if (!JWT_ACCESS_EXPIRES) {
    throw new Error("JWT_ACCESS_EXPIRES is not configured");
  }

  const token = jwt.sign({ userId }, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRES,
  } as SignOptions);

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: "strict", // CSRF attacks
    secure: envVars.NODE_ENV === "development" ? false : true,
  });

  return token;
};
