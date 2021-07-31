const Sequelize = require('sequelize');
const db = require('../settings/databaseConnection');

const Contactos = db.define('contactos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'El email es obligatorio',
      },
    },
  },
  mensaje: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'El mensaje de contácto es obligatorio',
      },
    },
  },
  nombre: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'El nombre de contácto es obligatorio',
      },
    },
  },
});

module.exports = Contactos;
