"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVariables = () => {
    const requiredEnvVars = [
        "PORT",
        "MONGO_URI",
        "NODE_ENV",
        "JWT_ACCESS_SECRET",
        "JWT_ACCESS_EXPIRES",
        "RESEND_API_KEY",
        "EMAIL_FROM",
        "EMAIL_FROM_NAME",
        "CLIENT_URL",
        "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_API_KEY",
        "CLOUDINARY_API_SECRET",
    ];
    requiredEnvVars.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        MONGO_URI: process.env.MONGO_URI,
        NODE_ENV: process.env.NODE_ENV,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        EMAIL_FROM: process.env.EMAIL_FROM,
        EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
        CLIENT_URL: process.env.CLIENT_URL,
        CLOUDINARY: {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        },
    };
};
exports.envVars = loadEnvVariables();
