// PRUEBA DE GIT
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

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
require('dotenv').config({path : 'variables.env'});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// middleware
app.use(morgan('dev'));
app.use(requestMiddleware.requestLoggerMiddleware);
app.use(cors());

/* const corsOptions = {
  origin: 'https://jcvillacob-psychic-system-9r7xwj6j57rfxg6v-4200.preview.app.github.dev',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); */


// Connect to MongoDB
connectDB();

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