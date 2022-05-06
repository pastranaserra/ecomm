const { requestBodyDoc } = require('../docs/req-body');
const {
  simpleCreatedResBodyDoc,
  fallbackInternalServerErrorResBodyDoc,
  createdResBodyDoc,
  simpleUnauthorizedResBodyDoc,
} = require('../docs/res-bodies');

exports.authTag = {
  name: 'auth',
  description: 'Authentication utilities.',
};

exports.authPaths = {
  '/auth/sign-up': {
    post: {
      tags: [this.authTag.name],
      summary: 'Sign up',
      description: 'Create user profile (non-admin).',
      operationId: '/auth/sign-up',
      requestBody: requestBodyDoc(
        'New user profile data.',
        '#/components/schemas/NewUser',
      ),
      responses: {
        ...simpleCreatedResBodyDoc(
          'Non-admin user profile created.',
          '#/components/schemas/User',
        ),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
  '/auth/log-in': {
    post: {
      tags: [this.authTag.name],
      summary: 'Log in',
      description: 'Log in user and get a JWT.',
      operationId: '/auth/log-in',
      requestBody: requestBodyDoc(
        'User credentials.',
        '#/components/schemas/UserCredentials',
      ),
      responses: {
        ...createdResBodyDoc('User logged in.', {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
            jwt: {
              type: 'string',
              format: 'JWT',
            },
          },
        }),
        ...simpleUnauthorizedResBodyDoc('Invalid credentials.'),
        ...fallbackInternalServerErrorResBodyDoc,
      },
    },
  },
};

exports.authSchemas = {
  UserCredentials: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
      },
    },
    required: ['email', 'password'],
  },
};
