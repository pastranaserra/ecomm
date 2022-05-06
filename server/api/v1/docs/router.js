const express = require('express');
const swaggerUi = require('swagger-ui-express');

const { port } = require('../../../../config');

const openApiDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Ecomm API',
    description: 'Ecomm management API',
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${port}/api/v1`,
    },
  ],
};

const router = express.Router();
router.use(swaggerUi.serve, swaggerUi.setup(openApiDoc));

module.exports = router;
