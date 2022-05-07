const express = require('express');

const router = express.Router();

const { add, read, modify, remove, isEmpty } = require('./controller');

router
  .route('/')
  .post(add)
  .get(isEmpty, read)
  .put(isEmpty, modify)
  .delete(isEmpty, remove);

module.exports = router;
