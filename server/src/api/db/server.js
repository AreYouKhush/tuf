const { Sequelize } = require("sequelize");
require('dotenv').config()

let sequelize;

if(process.env.PRODUCTION == "TRUE"){
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: 3306,
      dialect: "mysql",
    }
  );
}else{
  sequelize = new Sequelize(
    process.env.DB_NAME_LOCAL,
    process.env.DB_USERNAME_LOCAL,
    process.env.DB_PASSWORD_LOCAL,
    {
      host: process.env.DB_HOST_LOCAL,
      dialect: "mysql",
    }
  );
}

module.exports = sequelize;
