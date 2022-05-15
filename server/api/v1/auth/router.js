const express = require('express');

const { signUp, logIn, getProfile, logOut } = require('./controller');
const { me } = require('./middlewares');

const router = express.Router();

router
  .post('/sign-up', signUp)
  .post('/log-in', logIn)
  .get('/log-out', logOut)
  .get('/me', me, getProfile);

module.exports = router;
