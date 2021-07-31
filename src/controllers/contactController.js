const HandlerError = require('../helpers/errorHandler');
const Contacts = require('../models/contactModels');
const Products = require('../models/productsModel');
const { errorHandler } = new HandlerError();
class ContactController {
  async getRouter(req, res) {
    try {
      const contact = await Contacts.findAll();
      contact.length
        ? res.status(200).json(contact)
        : res.status(200).json('No hay mensajes de contactos');
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
  async postRouter(req, res) {
    const { email, mensaje, nombre } = req.body;
    if (!email.trim() || !mensaje.trim() || !nombre.trim()) {
      return res.render('index', {
        msg: 'Todos los campos son requeridos',
        typeAlert: 'danger',
      });
    }
    try {
      await Contacts.create({ email, mensaje, nombre });
      const products = await Products.findAll();
      res.render('index', {
        products,
        msg: 'Gracias por contactarnos',
        typeAlert: 'success',
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
  async deleteRouter(req, res) {
    console.log('entro');
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
module.exports = new ContactController();
