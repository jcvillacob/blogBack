const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../../../midleware/auth');
const multer = require('multer');

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    },
});

const upload = multer({ storage: storage });

// Todos pueden ver todos los posts
router.get('/', postController.getAllPosts);

// Rutas para que los autores puedan ver y editar sus propios posts
router.get('/me', auth.author, postController.getSelf);

// Cualquier author puede crear un post
router.post('/', auth.author, upload.single('image'), (req, res, next) => {
    // Verifica si la imagen ha sido cargada
    if (req.body.image) {
      req.file = {
        path: req.body.image,
      };
    }
    next();
  }, postController.createPost);

// Obtener un solo post por ID y rutas de administrador
router.get('/:id', postController.getPostById);
router.put('/:id', auth.author, postController.updatePost);
router.delete('/:id', auth.author, postController.deletePost);

module.exports = router;
