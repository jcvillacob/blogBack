const postRoutes = require('./routes');
const postController= require('./controllers/postController');
const Post = require('./models/postModel');

module.exports = {
  postRoutes ,
  postController,
  Post
};