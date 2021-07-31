const { Router } = require('express');
const contactController = require('../controllers/contactController');
const router = Router();
const { verifyAdmin } = require('../helpers/authSession');

router.post('/', contactController.postRouter);
router.get('/', verifyAdmin, contactController.getRouter);
router.use('/:id', verifyAdmin, contactController.deleteRouter);

module.exports = router;
