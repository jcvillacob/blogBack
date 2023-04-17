const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const auth = require('../../../midleware/auth');

router.get('/', auth.admin, requestController.getAllRequests);
router.get('/:id', auth.admin, requestController.getRequestById);

module.exports = router;