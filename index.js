// PRUEBA DE GIT
const express = require('express');
const app = express();
require('dotenv').config({path : 'variables.env'});
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

// Modules
const user = require('./modules/user');
const post = require('./modules/post');
const category = require('./modules/category');
const comment = require('./modules/comment');

// Login and requests
const login = require('./modules/login');
const request = require('./modules/request');


const requestMiddleware = require('./midleware/requests');
const connectDB = require('./config/db');
const cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }))

// middleware
app.use(morgan('dev'));
app.use(requestMiddleware.requestLoggerMiddleware);
app.use(cors());

// Connect to MongoDB
connectDB();

// Configuración para servir archivos estáticos
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/users', user.userRoutes);
app.use('/posts', post.postRoutes);
app.use('/categories', category.categoryRoutes);
app.use('/comments', comment.commentRoutes);

// Login
app.use('/login', login.loginRoutes);
app.use('/requests', request.requestRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});