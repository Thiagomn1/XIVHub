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
  const { email, password, lodestone } = req.body

  if (!email || !password || !lodestone) {
    res.status(400)
    throw new Error("Please include all fields")
  }

  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400)
    throw new Error("This user is already registered")
  }

  const character = await getCharacter(lodestone)

  if (character) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      email,
      password: hashedPassword,
      lodestoneId: lodestone,
      character: character,
    })

    if (user) {
      const token = generateToken(user._id)
      res.cookie("token", token, { httpOnly: true })
      res.json([
        {
          character: user.character,
          verified: user.verified,
        },
        {
          _id: user._id,
          email: user.email,
        },
      ])
    } else {
      res.status(400)
      throw new Error("Invalid Data")
    }
  } else {
    res.status(400)
    throw new Error("Character not found in Lodestone")
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id)
    res.cookie("token", token, { httpOnly: true })

    res.json([
      {
        character: user.character,
        verified: user.verified,
      },
      {
        _id: user._id,
        email: user.email,
      },
    ])
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

const verifyCharacter = asyncHandler(async (req, res) => {
  const { email, lodestone, token } = req.body
  console.log(req.body)

  if (!email || !lodestone || !token) {
    res.status(400)
    throw new Error("User not found")
  }

  const character = await verifyToken(lodestone, token)
  const user = await User.findOne({ email })

  if (character && user) {
    const query = { email: email }
    const update = {
      $set: { verified: true },
    }
    await User.findOneAndUpdate(query, update)

    res.json({
      character: character,
      verified: user.verified,
    })
  } else {
    res.status(401)
    throw new Error("There was an error verifying your character")
  }
})

const updateCharacter = asyncHandler(async (req, res) => {
  const { email, lodestone } = req.body

  if (!email || !lodestone) {
    res.status(400)
    throw new Error("User not found")
  }

  const character = await getCharacter(lodestone)
  const user = await User.findOne({ email })

  if (character && user) {
    const query = { email: email }
    const update = {
      $set: { lodestoneId: lodestone, character: character, verified: false },
    }
    await User.findOneAndUpdate(query, update)

    res.json({
      character: user.character,
      verified: user.verified,
    })
  } else {
    res.status(401)
    throw new Error("There was an error updating your character")
  }
})

const getCharacter = async id => {
  let res = await xiv.character.get(id)
  if (res.Character !== null) {
    return res.Character
  } else {
    return false
  }
}

const verifyToken = async (id, token) => {
  let res = await xiv.character.get(id)
  if (res.Character.Bio.includes(token)) {
    return res.Character
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
  verifyCharacter,
  updateCharacter,
  loginUser,
  logoutUser,
  getMe,
}
