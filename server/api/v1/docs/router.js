const express = require('express');
const swaggerUi = require('swagger-ui-express');

const { port } = require('../../../../config');
const { authPaths, authSchemas, authTag } = require('../auth/docs');
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
  tags: [authTag, healthTag],
  paths: {
    ...authPaths,
    ...healthPaths,
  },
  components: {
    schemas: {
      ...authSchemas,
      ...healthSchemas,
      ...usersSchemas,
    },
    securitySchemes: {
      Bearer: {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT',
      },
    },
  },
};

const router = express.Router();
router.use(swaggerUi.serve, swaggerUi.setup(openApiDoc));

module.exports = router;
