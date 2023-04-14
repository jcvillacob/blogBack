const commentRoutes = require('./routes');
const commentController= require('./controllers/commentController');
const Comment = require('./models/commentModel');

module.exports = {
  commentRoutes ,
  commentController,
  Comment
};