const { StatusCodes } = require("http-status-codes");

module.exports = errorHandler = (err, req, res, next) => {
  console.log(err);

  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong on the server",
  };
  if (err.cmdErr?.startsWith("The user name could not be found")) {
    defaultError.msg = "User doesn't exist";
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};
