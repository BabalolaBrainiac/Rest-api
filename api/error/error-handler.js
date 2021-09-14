const Apierror = require("./api-error");

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof Apierror) {
    res.status(error.code).json(error.message);
    return;
  }

  res.status(500).json("something went wrong");
}

module.exports = errorHandler;
