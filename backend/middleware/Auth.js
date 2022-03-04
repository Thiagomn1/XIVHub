const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/UserModel")

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    res.status(401)
    throw new Error("Not authorized")
  }

  try {
    // Get & verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user from token
    req.user = await User.findById(decoded.id).select("-password")

    next()
  } catch (error) {
    console.log(error)
    res.clearCookie("token")
    res.status(401)
    throw new Error("Not authorized")
  }
})

module.exports = { protect }
