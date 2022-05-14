const express = require('express');
const { me } = require('../auth/middlewares');

const router = express.Router();

const { add, read, remove } = require('./controller');
const { isEmpty } = require('./middlewares');

router
  .route('/')
  .post(me, add) // session before CRUD or for each CRUD action?
  .get(me, isEmpty, read)
  .delete(me, isEmpty, remove);

module.exports = router;
