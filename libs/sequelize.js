const { Sequelize } = require("sequelize");
const { config } = require("../config/config");
const setUpModels = require("../db/models");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
  dialect: "postgres",
  logging: config.isProd ? false : console.log,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(URI, options);

setUpModels(sequelize);

module.exports = sequelize;
