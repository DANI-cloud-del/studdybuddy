// lib/dbConnect.ts
import mongoose from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

// Define an interface for caching the connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare a global variable for caching the connection
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache;
}

// Initialize the cache if it doesn't exist
global.mongooseCache = global.mongooseCache || { conn: null, promise: null };

async function dbConnect(): Promise<typeof mongoose> {
  if (global.mongooseCache.conn) {
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(MONGODB_URI as string)
      .then((mongooseInstance) => mongooseInstance);
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
}

export default dbConnect;

