import { MongoClient } from "mongodb";

let db;
export const connectDB = async (uri, dbName) => {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log(`MongoDB connected: ${dbName}`);
};

export const getDb = () => {
  if (!db) throw new Error("Database not initialized");
  return db;
};
