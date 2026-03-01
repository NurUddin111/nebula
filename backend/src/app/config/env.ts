import dotenv from "dotenv";

dotenv.config();

interface IEnvConfig {
  PORT: string;
  MONGO_URI: string;
  NODE_ENV: "development" | "production";
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_FROM_NAME: string;
  CLIENT_URL: string;
  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };
  ARCJET_KEY: string;
  ARCJET_ENV: string;
}

const loadEnvVariables = (): IEnvConfig => {
  const requiredEnvVars: string[] = [
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
    "ARCJET_KEY",
    "ARCJET_ENV",
  ];

  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    MONGO_URI: process.env.MONGO_URI as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    RESEND_API_KEY: process.env.RESEND_API_KEY as string,
    EMAIL_FROM: process.env.EMAIL_FROM as string,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME as string,
    CLIENT_URL: process.env.CLIENT_URL as string,
    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    },
    ARCJET_KEY: process.env.ARCJET_KEY as string,
    ARCJET_ENV: process.env.ARCJET_KEY as string,
  };
};

export const envVars = loadEnvVariables();
