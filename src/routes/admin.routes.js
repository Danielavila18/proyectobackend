const { Router } = require('express');
const router = Router();

const adminController = require('../controllers/adminController');
router.get('/home', adminController.getAdmin);
router.use('/delete/:id', adminController.adminDeleteProduct);
router.use('/update/:id', adminController.adminGetUpdateProduct);
router.use('/updateProduct/:id', adminController.adminPostUpdateProduct);
router.post('/products', adminController.adminPostProduct);
router.get('/contact', adminController.getAdminContact);
module.exports = router;
