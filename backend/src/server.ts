import http from "http";
import dotenv from "dotenv";

import app from "./app.js";
import { connectDB } from "./config/db.js";

// Handle all uncaughtExceptions
process.on("uncaughtException", function (err) {
  console.log("UNCAUGHT EXCEPTION!  Shutting down ...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Load environment variables
dotenv.config({ path: ".env" });

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

// Start server
const myserver = server.listen(PORT, () => {
  // Initialize MongoDB connection
  connectDB();
  console.log(`Server is running on port:${PORT}`);
});

// Handle all unhandledRejections
process.on("unhandledRejection", function (err: Error) {
  console.log("UNHANDLED REJECTION!  Shutting down ...");
  console.log(err.name, err.message);
  myserver.close(() => process.exit(1));
});
