const errorHandlers = require('./error');
const { paginator } = require('./paginator');
const reqIdSetter = require('./req-id-setter');
const reqLogger = require('./logger');

module.exports = {
  reqIdSetter,
  reqLogger,
  paginator,
  errorHandlers,
};
