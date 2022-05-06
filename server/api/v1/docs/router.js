const express = require('express');
const swaggerUi = require('swagger-ui-express');

const { port } = require('../../../../config');
const { authPaths } = require('../auth/docs');
const { healthPaths, healthSchemas, healthTag } = require('../health/docs');
const { usersSchemas } = require('../users');

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
  tags: [healthTag],
  paths: {
    ...authPaths,
    ...healthPaths,
  },
  components: {
    schemas: {
      ...healthSchemas,
      ...usersSchemas,
    },
  },
};

const router = express.Router();
router.use(swaggerUi.serve, swaggerUi.setup(openApiDoc));

module.exports = router;
