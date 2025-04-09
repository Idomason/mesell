import mongoose from "mongoose";

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mesell";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    if (conn) console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`DB connection error: ${error}`);
    process.exit(1);
  }
};
