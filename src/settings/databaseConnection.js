const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
module.exports = new Sequelize(
  process.env.DB_NAME || 'proyecto' ,
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
