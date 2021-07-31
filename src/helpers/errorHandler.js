class HandlerError {
  errorHandler(error, req, res) {
    return res.status(500).json(error);
  }
}
module.exports = HandlerError;
