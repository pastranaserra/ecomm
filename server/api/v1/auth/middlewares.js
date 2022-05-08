const { verify } = require('jsonwebtoken');

const {
  jwt: { secret },
} = require('../../../../config');
const { UnauthorizedErrorResponse } = require('../../../responses');
const { User } = require('../users');

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
