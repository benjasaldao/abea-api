require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3000,
  dbHost: this.isProd ? process.env.PRODUCTION_DB_HOST : process.env.DEVELOPMENT_DB_HOST,
  dbName: this.isprod ? process.env.PRODUCTION_DB_NAME : process.env.DEVELOPMENT_DB_NAME,
  dbPassword: this.isprod ? process.env.PRODUCTION_DB_PASSWORD : process.env.DEVELOPMENT_DB_PASSWORD,
  dbUser: this.isProd ? process.env.PRODUCTION_DB_USER : process.env.DEVELOPMENT_DB_USER,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
  recoveryJwtSecret: process.env.RECOVERY_JWT_SECRET,
  whiteList: process.env.WHITE_LIST,
};

module.exports = { config };
