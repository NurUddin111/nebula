import mongoose from "mongoose";
import { envVars } from "../app/config/env";

export const connectDB = async () => {
  try {
    console.log("...Connecting to MONGODB");

    const conc = await mongoose.connect(envVars.MONGO_URI);
    console.log("🗳️  MONGODB CONNECTED:", conc.connection.host);
  } catch (error) {
    console.error("Error connecting to MONGODB:", error);
    process.exit(1);
  }
};
