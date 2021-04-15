import { ERROR_CODES } from "../../constants/error-codes.constants.js"

//Middleware to make sure the zip code is valid
//I am sure we could use a look up or do this better but
//I want to demonstrate some simple validation
export const zipCodeValidation = async (req, res, next) => {
  try {
    const zip = req.query.zipCode

    if (zip.length > 5 || zip.length <= 1) {
      res.status(400).json({ message: ERROR_CODES.INVALID_ZIP })
    } else {
      next()
    }
  } catch (e) {
    next(e)
  }
}
