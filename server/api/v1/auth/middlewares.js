const { verify } = require('jsonwebtoken');

const {
  jwt: { secret },
} = require('../../../../config');
const logger = require('../../../../logger');
const {
  UnauthorizedErrorResponse,
  ForbiddenErrorResponse,
  InternalServerErrorResponse,
} = require('../../../responses');
const { User } = require('../users/entity');

const bearerPrefix = 'Bearer ';

exports.me = async (req, _, next) => {
  try {
    const { headers = {} } = req;
    const authHeader = headers.authorization;
    if (!authHeader) return next(UnauthorizedErrorResponse());
    if (!authHeader.startsWith(bearerPrefix)) {
      return next(UnauthorizedErrorResponse());
    }
    const jwt = authHeader.substring(bearerPrefix.length);
    if (!jwt) return next(UnauthorizedErrorResponse());
    const { id } = await verify(jwt, secret);
    const me = await User.findById(id);
    if (!me) return next(UnauthorizedErrorResponse());
    req.me = me;
    return next();
  } catch (err) {
    return next(err);
  }
};

exports.isAdmin = async (req, _, next) => {
  try {
    if (!req.me) {
      logger.error(
        `
Implementation error:
The 'me' middleware must be used before the 'isAdmin' middleware.
`,
      );
      return next(InternalServerErrorResponse());
    }
    if (!req.me.isAdmin) return next(ForbiddenErrorResponse());
    return next();
  } catch (err) {
    return next(err);
  }
};
