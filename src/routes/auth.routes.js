const { Router } = require('express');
const router = Router();
const loginController = require('../controllers/loginController');

router.get('/login', loginController.getLogin);
router.get('/register', loginController.getRegister);
router.get('/logout', loginController.logout);

router.post('/register', loginController.register);
router.post('/login', loginController.login);

module.exports = router;
