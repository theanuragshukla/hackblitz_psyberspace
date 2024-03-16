const winston = require("winston");
const { combine, timestamp, json } = winston.format;
const path = require("path");

const logger = winston.createLogger({
  level: "info",
  format: combine(json(), timestamp()),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/app.log"),
    }),
    new winston.transports.Console(),
  ],
});

module.exports = logger;
