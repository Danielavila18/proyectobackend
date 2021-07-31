const { Router } = require('express');
const route = Router();
const indexController = require('../controllers/indexController');

route.get('/', indexController.homeRouter);

module.exports = route;
