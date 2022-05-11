const express = require('express');

const router = express.Router();

const { add, read, modify, remove } = require('./controller');
const { isEmpty } = require('./middlewares');

router
  .route('/')
  .post(add)
  .get(isEmpty, read)
  .put(isEmpty, modify)
  .delete(isEmpty, remove);

module.exports = router;
