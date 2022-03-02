const axios = require("axios")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/UserModel")

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
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
    email,
    password: hashedPassword,
  })

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
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
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid Credentials")
  }
})

const addCharacter = asyncHandler(async (req, res) => {
  const { name, email, lodestoneId, character } = req.body

  const user = await User.findOne({ email })

  if (user) {
    const query = { email: email }
    const update = { $set: { name: name, lodestoneId: lodestoneId }, $push: { character: character } }
    await User.findOneAndUpdate(query, update)

    res.json({
      name,
      email,
      lodestoneId,
      character,
    })
  } else {
    res.status(401)
    throw new Error("User not found")
  }
})

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

module.exports = {
  registerUser,
  addCharacter,
  loginUser,
}
