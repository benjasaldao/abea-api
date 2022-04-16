const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports =  {
  development: {
    url: URI,
    dialect: 'postgres',
    host: 'localhost'
  },
  production: {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      ssl : {
        rejectUnauthorized: false
      }
    }
  }
};