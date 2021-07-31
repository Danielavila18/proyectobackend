const Sequelize = require('sequelize');
const db = require('../settings/databaseConnection');

const Cliente = db.define('clientes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'El nombre es obligatorio',
      },
    },
  },
  cedula: {
    allowNull: false,
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: {
        msg: 'La cedula es obligatorio',
      },
    },
  },
  telefono: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'El telefono es obligatorio',
      },
    },
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: 'El correo es obligatorio',
      },
    },
  },
});

module.exports = Cliente;
