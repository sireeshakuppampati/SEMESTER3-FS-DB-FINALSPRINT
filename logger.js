// logger.js
const winston = require('winston');
const path = require('path');

// Create a log file path
const logFilePath = path.join(__dirname, 'logs', 'search-queries.log');

// Create a winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: logFilePath })
    ]
});

module.exports = logger;
