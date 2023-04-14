const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../../../midleware/auth');

// Permitir que cualquiera cree un nuevo usuario
router.post('/', userController.createUser);

// Rutas para que los usuarios de rol "commenter" puedan ver y editar su propio usuario
router.get('/me', auth.auth, userController.getSelf);
router.put('/me', auth.auth, userController.updateSelf);

// Rutas para que los usuarios de rol "admin" puedan ver y editar a todos los usuarios
router.get('/', userController.getAllUsers);
router.get('/:id', auth.admin, userController.getUserById);
router.put('/:id', auth.admin, userController.updateUser);

// Ruta para que solo los usuarios de rol "author" puedan eliminar usuarios
router.delete('/:id', auth.admin, userController.deleteUser);

module.exports = router;
