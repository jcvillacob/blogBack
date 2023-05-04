const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../../../midleware/auth');

// Todos pueden ver todos los posts
router.get('/', postController.getAllPosts);

// Rutas para que los autores puedan ver y editar sus propios posts
router.get('/me', auth.author, postController.getSelf);

// Cualquier author puede crear un post
router.post('/', auth.author, postController.createPost);

// Obtener un solo post por ID y rutas de administrador
router.get('/:id', postController.getPostById);
router.put('/:id', auth.author, postController.updatePost);
router.delete('/:id', auth.author, postController.deletePost);

module.exports = router;
