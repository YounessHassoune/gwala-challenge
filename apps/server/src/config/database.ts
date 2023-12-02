import mongoose from "mongoose";
import { MONGO_URI } from "./env";

/**
 * @description Connect to MongoDB Database
 * @returns {Promise<void>} - Promise object of void
 */
export default async function database(): Promise<void> {
  const connect = async () => {
    try {
      const conn = await mongoose.connect(MONGO_URI);
      const message = `MongoDB Connected: ${conn.connection.host}:${conn.connection.port}`;
      console.log("Database", message);
    } catch (error: any) {
      console.log("Database", error.message);
      return process.exit(1);
    }
  };

  await connect();

  mongoose.connection.on("disconnected", connect);
}
