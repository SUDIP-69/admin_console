const mongoose = require("mongoose");

const conndb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  } else {
    mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/baksish');
    return handler(req, res);
  }
};
export default conndb;