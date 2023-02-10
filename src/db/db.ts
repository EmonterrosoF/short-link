import mongoose from "mongoose";

const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ts";

export async function dbConnect() {
  try {
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(URI);
    console.log("Database connected to ", db.connection.db.databaseName);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      process.exit(1);
    }
  }
}
