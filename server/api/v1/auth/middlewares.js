const { verify } = require('jsonwebtoken');

const {
  jwt: { secret },
} = require('../../../../config');
const { User } = require('../users');

const bearerPrefix = 'Bearer ';

const unauthorizedResponse = { statusCode: 401, message: 'Unauthorized' };

exports.me = async (req, _, next) => {
  try {
    const { headers = {} } = req;
    const authHeader = headers.authorization;
    if (!authHeader) return next(unauthorizedResponse);
    if (!authHeader.startsWith(bearerPrefix)) return next(unauthorizedResponse);
    const jwt = authHeader.substring(bearerPrefix.length);
    if (!jwt) return next(unauthorizedResponse);
    const { id } = await verify(jwt, secret);
    const me = await User.findById(id);
    if (!me) return next(unauthorizedResponse);
    req.me = me;
    return next();
  } catch (error) {
    return next(unauthorizedResponse);
  }
};
