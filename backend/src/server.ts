import "dotenv/config";
import http from "http";

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { getEnv } from "./lib/env.js";
import serverJob from "./lib/cron.js";

const env = getEnv();

// Handle all uncaughtExceptions
process.on("uncaughtException", function (err) {
  console.log("UNCAUGHT EXCEPTION!  Shutting down ...");
  console.log(err.name, err.message);
  process.exit(1);
});

const server = http.createServer(app);

const PORT = env.PORT || 8000;

// Start server
const myserver = server.listen(PORT, () => {
  // Restarts Render server every 14mins.
  if (env.NODE_ENV === "production") serverJob.start();

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
