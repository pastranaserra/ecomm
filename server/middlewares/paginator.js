const { BadRequestErrorResponse } = require('../responses');

const defaultLimit = 10;
const minLimit = 1;
const maxLimit = 100;

const defaultOffset = 0;
const minOffset = 0;

exports.paginator = (req, _, next) => {
  const {
    limit: limitStr = defaultLimit, // This comment prevents linting issues.
    offset: offsetStr = defaultOffset,
  } = req.query;
  const limit = parseInt(limitStr, 10);
  const offset = parseInt(offsetStr, 10);
  const limitIsValid = !Number.isNaN(limit) && limit >= minLimit;
  const offsetIsValid = !Number.isNaN(offset) && offset >= minOffset;
  if (!limitIsValid || !offsetIsValid) {
    const baseErrorMsg = 'Invalid pagination parameters';
    const invalidLimitMsg = limitIsValid
      ? ''
      : ' `limit` must be a positive integer.';
    const invalidOffsetMsg = offsetIsValid
      ? ''
      : ' `offset` must be an integer greater than or equal to 0.';
    // TODO: Return to avoid following middlewares.
    next(
      BadRequestErrorResponse(
        `${baseErrorMsg}${invalidLimitMsg}${invalidOffsetMsg}`,
      ),
    );
  }
  req.limit = Math.min(limit, maxLimit);
  req.offset = offset;
  next();
};

exports.paginatorQueryParamsDocs = {
  limitQueryParam: {
    in: 'query',
    name: 'limit',
    description: 'Number of items to return',
    required: false,
    schema: {
      type: 'integer',
      format: 'int32',
      minimum: minLimit,
      maximum: maxLimit,
      default: defaultLimit,
    },
  },
  offsetQueryParam: {
    in: 'query',
    name: 'offset',
    description: 'Number of items to skip',
    required: false,
    schema: {
      type: 'integer',
      format: 'int32',
      minimum: minOffset,
      default: defaultOffset,
    },
  },
};
