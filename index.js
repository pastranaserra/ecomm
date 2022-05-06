const http = require('http');

const { port, database: dbConnectionData } = require('./config');
const database = require('./database');
const logger = require('./logger');
const app = require('./server');

database.connect(dbConnectionData);

const server = http.createServer(app);
server.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
