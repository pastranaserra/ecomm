// const sessions = require('express-session');
// const MongoStore = require('connect-mongo');
// const { database } = require('../config');

// const session = {
//   secret: 'the ultra secret',
//   rolling: true,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: true,
//     sameSite: 'none',
//     maxAge: 1000 * 60 * 5, // 10 min
//     httpOnly: true,
//   },
//   store: MongoStore.create({
//     mongoUrl: `${database.protocol}://${database.url}`,
//   }),
// };

// module.exports = {
//   sessions,
//   session,
// };
