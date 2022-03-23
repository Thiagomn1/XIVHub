const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lodestoneId: {
      type: String,
      required: true,
      default: "",
    },
    character: {
      type: Array,
      required: true,
      default: [],
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema)
