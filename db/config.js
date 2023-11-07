const { config } = require('../config/config');

module.exports =  {
  development: {
    dialect: 'postgres',
    host: config.productionDbHost,
    username: config.productionDbUser,
    password: config.productionDbPassword,
    database: config.productionDbName,
    port: 5432,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
};