/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "http";
import app from "./app";
import { envVars } from "./app/config/env";
import { connectDB } from "./lib/db";

let server: Server;
const PORT = envVars.PORT || 1126;

const startServer = async () => {
  try {
    server = app.listen(PORT, () => {
      console.log(`Nebula is listening on port 1126`);

      connectDB();
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

(async () => {
  await startServer();
})();
