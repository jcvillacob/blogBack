const Request = require('../modules/request/models/requestModel');

exports.requestLoggerMiddleware = async (req, res, next) => {
  const newRequest = new Request({
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: JSON.stringify(req.body),
    timestamp: new Date(),
  });

  try {
    await newRequest.save();
    next();
  } catch (err) {
    console.error('Error al guardar la solicitud en MongoDB:', err);
    next();
  }
};
