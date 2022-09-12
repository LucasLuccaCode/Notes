require("dotenv").config()

const express = require("express")
const app = express()
const routes = require("./routes")
const path = require("path")
const { default: mongoose } = require("mongoose")
const PORT = 3000

//Connecting on Mongodb
mongoose.connect(process.env.MONGO_URL)
  .then( () => {
    console.log("Connected on mongodb")
    app.emit("logged")
  })
  .catch( err => console.log(err))

//Routes
app.use(routes)

app.on("logged", () => {
  app.listen(PORT, () => {
    console.log("Listening on port 3000")
  })
})