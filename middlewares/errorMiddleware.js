const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 400;
    const message = err.message || "something went wrong in backend";
  
    return res.status(status).json({ msg: message });
  };
  
  module.exports = errorMiddleware;
  