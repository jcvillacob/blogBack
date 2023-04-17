const Request = require('../models/requestModel');

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find({});
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    res.status(200).json(request);
  } catch (err) {
    res.status(500).send(err);
  }
};