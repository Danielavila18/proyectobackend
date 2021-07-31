const Sequelize = require("sequelize");
const db = require("../settings/databaseConnection");

const Usuarios = db.define("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  clave: {
    type: Sequelize.STRING,
  },
});

module.exports = Usuarios;
