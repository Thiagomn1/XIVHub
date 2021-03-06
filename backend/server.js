const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const cookieParser = require("cookie-parser")

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.JWT_SECRET))

app.get("/", (req, res) => {
  res.json({ message: "XIV Hub API" })
})

app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/events", require("./routes/eventRoutes"))

app.listen(5000, () => console.log("Server running on port 5000"))
