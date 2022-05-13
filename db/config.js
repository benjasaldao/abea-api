const { config } = require('../config/config');

module.exports =  {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
    host: 'localhost'
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl : {
        rejectUnauthorized: false
      }
    }
  }
};