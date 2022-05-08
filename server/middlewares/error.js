const logger = require('../../logger');
const { logErrorOnRequest } = require('../logger');
const {
  NotFoundErrorResponse,
  InternalServerErrorResponse,
} = require('../responses');

const notFoundMiddleware = (_, __, next) => next(NotFoundErrorResponse());

const fallbackErrorMiddleware = (err, _, __, next) => {
  logger.error(`
Fallback error middleware:
${err}
`);
  const errRes = { ...InternalServerErrorResponse(), ...err };
  next({ statusCode: errRes.statusCode, message: errRes.message });
};

const errorLoggerMiddleware = (err, req, __, next) => {
  const { statusCode, message } = err;
  logErrorOnRequest(req, statusCode, message);
  next(err);
};

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, _, res, __) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({ message });
};

const errorHandlers = [
  notFoundMiddleware,
  fallbackErrorMiddleware,
  errorLoggerMiddleware,
  errorHandlerMiddleware,
];

module.exports = errorHandlers;
