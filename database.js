const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.connection.on('open', () => logger.info('Connected to DB'));
mongoose.connection.on('close', () => logger.info('Disconnected from DB'));
mongoose.connection.on('error', (err) => logger.error(`DB error: ${err}`));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Disconnected from DB (on process SIGINT)');
    process.exit(0);
  });
});

exports.connect = ({
  protocol = '',
  url = '',
  username = '',
  password = '',
}) => {
  let dbUrl = '';

  if (!username || !password) {
    dbUrl = `${protocol}://${url}`;
  } else {
    dbUrl = `${protocol}://${username}:${password}@${url}`;
  }
  mongoose.connect(dbUrl);
};

exports.disconnect = () => {
  mongoose.connection.close(() => {
    logger.info('Disconnected from DB (on demand)');
  });
};
