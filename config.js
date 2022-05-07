require('dotenv').config();

const config = {
  port: process.env.PORT,
  database: {
    protocol: process.env.DB_PROTOCOL,
    url: process.env.DB_URL,
    usernane: process.env.DB_USERNANE,
    password: process.env.DB_PASSWORD,
  },
  defaultAdmin: {
    name: process.env.DEFAULT_ADMIN_NAME,
    lastName: process.env.DEFAULT_ADMIN_LAST_NAME,
    email: process.env.DEFAULT_ADMIN_EMAIL,
    password: process.env.DEFAULT_ADMIN_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};

module.exports = config;
