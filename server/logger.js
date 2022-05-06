const morgan = require('morgan');

const logger = require('../logger');

function logErrorOnRequest(req, statusCode, message, level = 'error') {
  const date = new Date();
  const metadata = `${req.ip} [${date.toISOString()}] ${req.id}`;
  const logMsg = `${metadata} - "${req.method} ${req.url}" - ${statusCode} - ${message}`;
  logger[level](logMsg);
}

morgan.token('id', (req) => req.id);
const reqLogger = morgan(
  ':remote-addr [:date[iso]] :id - ":method :url" - :status',
  { stream: { write: (message) => logger.info(message.trim()) } },
);

module.exports = { logErrorOnRequest, reqLogger };
