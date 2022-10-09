/** @format */

import createHttpError from "http-errors"
import atob from "atob"
import UsersModel from "../../api/users/model.js"

export const basicAuthMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    next(
      createHttpError(
        401,
        "Please provide credentials in Authorization header!"
      )
    )
  } else {
    const base64Credentials = req.headers.authorization.split(" ")[1] // --> "am9obkByYW1iby5jb206MTIzNA=="
    const decodedCredentials = atob(base64Credentials) // --> "john@rambo.com:1234"
    const [email, password] = decodedCredentials.split(":") // --> email=john@rambo.com, password=1234

    const user = await UsersModel.checkCredentials(email, password)

    if (user) {
      req.user = user
      next()
    } else {
      next(createHttpError(401, "Credentials are wrong!"))
    }
  }
}
