const Sequelize = require('sequelize');
const db = require('../settings/databaseConnection');

const Productos = db.define('productos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Debes ingresar el nombre para poder almacenar el producto',
      },
    },
  },
  marca: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Debes ingresar la marca para poder almacenar el producto',
      },
    },
  },
  descripcion: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Debes ingresar la descripción para poder almacenar el producto',
      },
    },
  },
  stock: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg:
          'Debes ingresar los productos en stock para poder almacenar el producto',
      },
    },
  },
  imagen: {
    type: Sequelize.TEXT('long'),
    allowNull: false,
    validate: {
      notEmpty: {
        msg:
          'Debes ingresar la imagen del producto para poder almacenar el producto',
      },
    },
  },
  precio: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Debes ingresar el precio poder almacenar el producto',
      },
    },
  },
});

module.exports = Productos;
