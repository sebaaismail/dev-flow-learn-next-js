import mongoose, { Mongoose } from "mongoose";
import logger from "./logger";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    logger.info("Using existing mongoose connection");
    return cached.conn;
  }

  if (!cached.promise) {
    logger.info("dbConnect - starting new mongoose connection");
    const start = Date.now();
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "devflow",
      })
      .then((result) => {
        const duration = Date.now() - start;
        logger.info(`MongoDB connected in ${duration}ms`);
        return result;
      })
      .catch((error) => {
        logger.error("MongoDB connection error:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
