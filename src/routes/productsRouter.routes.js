const { Router } = require('express');
const router = Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getRouterProducts);
router.get('/:id', productsController.getIdRouterProducts);
router.post('/', productsController.postRouterProducts);
router.post('/:id', productsController.putRouterProducts);
router.get('/:id', productsController.deleteRouterProducts);

module.exports = router;
