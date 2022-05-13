const sessions = require('express-session');
const { reqIdSetter } = require('./middlewares/req-id-setter');

const session = {
  id: reqIdSetter(), // use UUIDs for session IDs
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 60 * 24, // one day
  },
};

module.exports = {
  sessions,
  session,
};
