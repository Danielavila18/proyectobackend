const { Router } = require('express');
const clientController = require('../controllers/clientsController');

const router = Router();
router.get('/', clientController.getRouter);
router.post('/', clientController.postRouter);
router.get('/update/:id', clientController.getPutRouter);
router.post('/update/:id', clientController.putRouter);
router.get('/delete/:id', clientController.deleteRouter);

module.exports = router;
