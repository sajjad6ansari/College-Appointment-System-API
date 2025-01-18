const BadRequestError = require("./badRequest")
const CustomAPIError = require("./customError")
const UnauthenticatedError = require("./unauthenticated")
const NotFoundError = require("./notFound")

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
}
