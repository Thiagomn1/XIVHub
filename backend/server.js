const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.json({ message: "XIV Venue API" })
})

app.use("/api/users", require("./routes/userRoutes"))

app.listen(5000, () => console.log("Server running on port 5000"))
