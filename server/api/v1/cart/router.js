const express = require('express');

const router = express.Router();

const { add, read, modify } = require('./controller');

router.route('/').post(add).get(read).put(modify);

module.exports = router;
