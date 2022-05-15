const express = require('express');
const cors = require('cors');
// const { sessions, session } = require('./session');
const cookieSession = require('cookie-session');
const apiV1 = require('./api/v1');
const { reqIdSetter, reqLogger, errorHandlers } = require('./middlewares');

const app = express();

// Enable CORS
app.use(cors());

// Process JSON payload.
app.use(express.json());

// Set request IDs on each request.
app.use(reqIdSetter);

// Log every request.
app.use(reqLogger);

app.set('trust proxy', 1);
// app.use(sessions(session));
app.use(
  cookieSession({
    name: 'session',
    secret: 'the top-secret',
    maxAge: 1000 * 60 * 60 * 5, // 5 min
  }),
);
// Plug API routes into the app.
// Using the V1 implementation as default.
app.use('/api', apiV1);
app.use('/api/v1', apiV1);

// Handle errors.
app.use(...errorHandlers);

module.exports = app;
