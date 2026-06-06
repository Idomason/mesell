import winston from "winston";
import path from "path";

const { combine, timestamp, printf, colorize, json, errors } = winston.format;

// Determine log level from environment, default to 'info'
const logLevel =
  process.env.LOG_LEVEL ||
  (process.env.NODE_ENV === "production" ? "info" : "debug");

// Custom format for development (human-readable with colors)
const devFormat = combine(
  colorize({ all: true }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(({ timestamp, level, message, stack, ...meta }) => {
    let log = `${timestamp} ${level}: ${message}`;
    if (stack) {
      log += `\n${stack}`;
    }
    if (Object.keys(meta).length) {
      log += `\n${JSON.stringify(meta, null, 2)}`;
    }
    return log;
  }),
);

// Production format (JSON for structured logging)
const prodFormat = combine(
  errors({ stack: true }), // include stack traces in error objects
  timestamp(),
  json(),
);

// Choose format based on environment
const format = process.env.NODE_ENV === "production" ? prodFormat : devFormat;

// Configure transports (where logs go)
const transports: winston.transport[] = [
  new winston.transports.Console({
    level: logLevel,
    handleExceptions: true,
  }),
];

// Optional: Add file transport for errors in production
if (process.env.NODE_ENV === "production") {
  transports.push(
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs", "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs", "combined.log"),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  );
}

// Create the logger instance
const logger = winston.createLogger({
  level: logLevel,
  format,
  transports,
  exitOnError: false, // don't crash on unhandled logging exceptions
});

// If not in production, also log unhandled rejections to the console
if (process.env.NODE_ENV !== "production") {
  logger.on("error", (err) => {
    console.error("Logger error:", err);
  });
}

export default logger;
