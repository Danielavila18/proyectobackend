const Products = require('../models/productsModel');
const Contacts = require('../models/contactModels');
const HandleError = require('../helpers/errorHandler');
const { errorHandler } = new HandleError();
class AdminController {
  async getAdmin(req, res) {
    try {
      const products = await Products.findAll();
      res.render('admin/index', {
        products,
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
  async adminPostProduct(req, res) {
    const { nombre, stock, precio, marca, imagen, descripcion } = req.body;
    try {
      const respuesta = await Products.create({
        nombre,
        stock,
        precio,
        marca,
        imagen,
        descripcion,
      });
      const msg = respuesta
        ? { msg: 'Producto almacenado correctamente', typeAlert: 'success' }
        : { msg: 'No se pudo crear el producto', typeAlert: 'danger' };
      const products = await Products.findAll();
      res.render('admin/index', { msg, products });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
  async adminGetUpdateProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Products.findOne({ where: { id } });
      if (!product) {
        const msg = {
          msg: 'No existe este producto',
          typeAlert: 'danger',
        };
        return res.render('admin/updateProduct', { msg });
      }
      res.render('admin/updateProduct', { product });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
  async adminPostUpdateProduct(req, res) {
    const { nombre, stock, precio, marca, imagen, descripcion } = req.body;
    const { id } = req.params;
    try {
      const updateProduct = await Products.update(
        { nombre, stock, precio, marca, imagen, descripcion },
        { where: { id } }
      );
      const [statusUpdate] = updateProduct;
      const msg = statusUpdate
        ? { msg: 'Producto actualizado correctamente', typeAlert: 'success' }
        : { msg: 'No se pudo actualizar el producto', typeAlert: 'danger' };
      const products = await Products.findAll();
      res.render('admin/index', { msg, products });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
  async adminDeleteProduct(req, res) {
    const { id } = req.params;
    try {
      const deletedProduct = await Products.destroy({ where: { id } });
      const msg = deletedProduct
        ? { msg: 'Producto eliminado correctamente', typeAlert: 'success' }
        : { msg: 'No se pudo eliminar el producto', typeAlert: 'danger' };
      const products = await Products.findAll();
      res.render('admin', { msg, products });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
  async getAdminContact(req, res) {
    try {
      const contacts = await Contacts.findAll();
      res.render('admin/contact', {
        contacts,
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
  async deleteRouter(req, res) {
    const { id } = req.params;
    try {
      const deletedContact = await Contacts.destroy({ where: { id } });
      const msg = deletedContact
        ? { msg: 'Contacto eliminado correctamente', typeAlert: 'success' }
        : { msg: 'No se pudo eliminar el contacto', typeAlert: 'danger' };
      const contacts = await Contacts.findAll();
      res.render('admin/contact', { msg, contacts });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}
module.exports = new AdminController();
