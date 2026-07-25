import "dotenv/config";
import fs from "fs";
import mongoose from "mongoose";
import { Product } from "../models/ProductModel";
import path from "path";
import { connectDB } from "./db";

const dataPath = path.join(__dirname, "../utils/seedData.json");

export async function seedData() {
  console.log("Connecting to MongoDB for seeding...");
  await connectDB(); // Ensure this function is imported from your db.ts file
  console.log("Connected to MongoDB. Starting seeding process...");

  try {
    const seedData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    await Product.deleteMany({});
    await Product.insertMany(seedData);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}
seedData();
