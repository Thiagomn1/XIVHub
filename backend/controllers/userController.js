const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")

const User = require("../models/UserModel")

const registerUser = asyncHandler(async (req, res) => {
  const { lodestoneId, name, email, password } = req.body

  if (!lodestoneId || !name || !email || !password) {
    res.status(400)
    throw new Error("Please include all fields")
  }

  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error("This user is already registered")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    lodestoneId,
    password: hashedPassword,
  })

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      lodestoneId: user.lodestoneId,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error("Invalid Data")
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      lodestoneId: user.lodestoneId,
    })
  } else {
    res.status(401)
    throw new Error("Invalid Credentials")
  }
})

module.exports = {
  registerUser,
  loginUser,
}
