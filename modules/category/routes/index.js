const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../../../midleware/auth');

router.get('/', /* auth.auth,  */categoryController.getAllCategories);
router.get('/:id', /* auth.auth,  */categoryController.getCategoryById);
router.post('/', auth.admin, categoryController.createCategory);
router.put('/:id', auth.admin, categoryController.updateCategory);
router.delete('/:id', auth.admin, categoryController.deleteCategory);

module.exports = router;