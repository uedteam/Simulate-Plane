import winston from "winston";

const logDir = "logs";
const logFile = `${logDir}/app.log`;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: logFile }),
  ],
});

export function log(...args) {
  logger.info(args.join(" "));
}

export function error(...args) {
  logger.error(args.join(" "));
}
