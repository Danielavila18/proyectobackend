const HandlerError = require('../helpers/errorHandler');
const Clientes = require('../models/clientsModels');
const { errorHandler } = new HandlerError();
class ClientController {
  async getRouter(req, res) {
    try {
      const clients = await Clientes.findAll();
      res.render('admin/client', { clients });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
  async postRouter(req, res) {
    const { nombre, cedula, telefono, email } = req.body;
    try {
      const respuesta = await Clientes.create({
        nombre,
        cedula,
        telefono,
        email,
      });
      const msg = respuesta
        ? { msg: 'Cliente registrado correctamente', typeAlert: 'success' }
        : { msg: 'No se pudo registrar el cliente', typeAlert: 'danger' };
      const clients = await Clientes.findAll();
      res.render('admin/client', { msg, clients });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async getPutRouter(req, res) {
    const { id } = req.params;
    try {
      const client = await Clientes.findOne({ where: { id } });
      if (!client) {
        const msg = {
          msg: 'Este cliente no esta registrado',
          typeAlert: 'danger',
        };
        return res.render('admin/clientUpdate', { msg });
      }
      res.render('admin/clientUpdate', { client });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async putRouter(req, res) {
    const { nombre, cedula, telefono, email } = req.body;
    const { id } = req.params;
    try {
      const updateClient = await Clientes.update(
        { nombre, cedula, telefono, email },
        { where: { id } }
      );
      const [statusUpdate] = updateClient;
      const msg = statusUpdate
        ? { msg: 'Cliente actualizado correctamente', typeAlert: 'success' }
        : { msg: 'No se pudo actualizar el cliente', typeAlert: 'danger' };
      const clients = await Clientes.findAll();
      res.render('admin/client', { msg, clients });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }

  async deleteRouter(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Clientes.destroy({ where: { id } });
      const msg = deleted
        ? { msg: 'Cliente eliminado correctamente', typeAlert: 'success' }
        : { msg: 'No se pudo eliminar el cliente', typeAlert: 'danger' };
      const clients = await Clientes.findAll();
      res.render('admin/client', { msg, clients });
    } catch (error) {
      errorHandler(error, res, res);
    }
  }
}
module.exports = new ClientController();
