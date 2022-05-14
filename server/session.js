const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const { database } = require('../config');

const session = {
  secret: 'the ultra secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 60 * 24, // one day
  },
  store: MongoStore.create({
    mongoUrl: `${database.protocol}://${database.url}`,
  }),
};

module.exports = {
  sessions,
  session,
};
