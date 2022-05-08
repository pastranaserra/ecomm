const express = require('express');

const { paginator } = require('../../../middlewares/paginator');
const { me } = require('../auth/middlewares');
const { listUsers } = require('./controller');

const router = express.Router();

router.route('/').get(me, paginator, listUsers);

module.exports = router;
