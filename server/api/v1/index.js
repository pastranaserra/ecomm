const express = require('express');

const cart = require('./cart/router');

const router = express.Router();

// Functional endpoints
router.use('/auth', require('./auth').router);
router.use('/health', require('./health').router);

router.use('/cart', cart);

// OpenAPI documentation
router.use('/docs', require('./docs').router);

module.exports = router;
