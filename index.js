const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const user = require('./modules/user');
const post = require('./modules/post');
const category = require('./modules/category');
const comment = require('./modules/comment');


// const middleware = require('./middleware');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config({path : 'variables.env'});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// middleware
// app.use(middleware);
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/users', user.userRoutes);
app.use('/posts', post.postRoutes);
app.use('/categories', category.categoryRoutes);
app.use('/comments', comment.commentRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});