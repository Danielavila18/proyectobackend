const Products = require('../models/productsModel');
const HandleError = require('../helpers/errorHandler');
const { errorHandler } = new HandleError();
class MainController {
  async homeRouter(req, res) {
    try {
      const products = await Products.findAll();
      res.render('index', {
        products,
      });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}

module.exports = new MainController();
