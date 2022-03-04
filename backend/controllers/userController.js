const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const XIVAPI = require("@xivapi/js")
const xiv = new XIVAPI({
  private_key: process.env.XIV_API_KEY,
  language: "en",
})

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
    const token = generateToken(user._id)
    res.cookie("token", token, { httpOnly: true })
    res.json({
      _id: user._id,
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
    const token = generateToken(user._id)
    res.cookie("token", token, { httpOnly: true })

    if (user.character && user.name) {
      res.json({
        name: user.name,
        character: user.character,
        _id: user._id,
        email: user.email,
      })
    } else {
      res.json({
        _id: user._id,
        email: user.email,
      })
    }
  } else {
    res.status(401)
    throw new Error("Invalid Credentials")
  }
})

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token")
  res.send({ success: true })
})

const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  }

  res.json(user)
})

const addCharacter = asyncHandler(async (req, res) => {
  const { email, lodestoneId } = req.body

  if (!email || !lodestoneId) {
    res.status(400)
    throw new Error("User not found")
  }

  let characterArray = []

  const character = await verifyCharacter(lodestoneId)
  const user = await User.findOne({ email })

  if (character && user) {
    characterArray.push(character)
    const query = { email: email }
    const update = {
      $set: { name: character.Character.Name, lodestoneId: lodestoneId, character: character },
    }
    const user = await User.findOneAndUpdate(query, update)

    res.json({
      name: character.Character.Name,
      email,
      character: characterArray,
      _id: user._id,
    })
  } else {
    res.status(401)
    throw new Error("There was an error verifying your character")
  }
})

const verifyCharacter = async id => {
  let res = await xiv.character.get(id)
  if (res.Character.Bio === "fflogs-LvxAHrbGXfdYncmCwRQkTaK1PpD624zN") {
    return res
  } else {
    return false
  }
}

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

module.exports = {
  registerUser,
  addCharacter,
  loginUser,
  logoutUser,
  getMe,
}
