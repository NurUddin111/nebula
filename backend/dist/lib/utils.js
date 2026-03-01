"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../app/config/env");
const generateToken = (userId, res) => {
    const JWT_ACCESS_SECRET = env_1.envVars.JWT_ACCESS_SECRET;
    const JWT_ACCESS_EXPIRES = env_1.envVars.JWT_ACCESS_EXPIRES;
    if (!JWT_ACCESS_SECRET) {
        throw new Error("JWT_ACCESS_SECRET is not configured");
    }
    if (!JWT_ACCESS_EXPIRES) {
        throw new Error("JWT_ACCESS_EXPIRES is not configured");
    }
    const token = jsonwebtoken_1.default.sign({ userId }, JWT_ACCESS_SECRET, {
        expiresIn: JWT_ACCESS_EXPIRES,
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks: cross-site scripting
        sameSite: "strict", // CSRF attacks
        secure: env_1.envVars.NODE_ENV === "development" ? false : true,
    });
    return token;
};
exports.generateToken = generateToken;
