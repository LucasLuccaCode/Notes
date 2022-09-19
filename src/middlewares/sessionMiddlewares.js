require("dotenv").config()

const session = require("express-session")
const MongoStore = require("connect-mongo")

module.exports = session({
  secret: "sdf7as6df8asdf08*&",
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 24 * 7 * 1000, //7 days
    httpOnly: true
  }
})