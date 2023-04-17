const requestRoutes = require('./routes');
const requestController= require('./controllers/requestController');
const Request = require('./models/requestModel');

module.exports = {
  requestRoutes ,
  requestController,
  Request
};