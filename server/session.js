const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const { mongoose } = require('mongoose');

const session = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 60 * 24, // one day
  },
  store: MongoStore.create({ mongooseConnection: mongoose.connection }),
};

module.exports = {
  sessions,
  session,
};
