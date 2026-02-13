import { Server } from "http";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;
const PORT = envVars.PORT || 1126;

const startServer = async () => {
  try {
    console.log("...connecting to DB");

    console.log("DB connected!");

    server = app.listen(PORT, () => {
      console.log(`Nebula is listening on port 1126`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

(async () => {
  await startServer();
})();
